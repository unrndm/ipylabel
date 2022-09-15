#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Danil Kireev.
# Distributed under the terms of the Modified BSD License.

"""
Widget for labeling text
"""
from __future__ import annotations

from ipywidgets import DOMWidget
from traitlets import Bool, Dict, Integer, List, Unicode, validate, TraitError
from itertools import combinations

# can be moved to typing in 3.11
from typing_extensions import Self

from ._frontend import module_name, module_version
from .types import Color, ProposalType, Result
from .utils import spans_overlap


class TextWidget(DOMWidget):
    """Widget providing a way to label data in jupyter"""

    _model_name = Unicode("TextLabelingModel").tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

    _view_name = Unicode("TextLabelingView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    # Your widget state goes here. Make sure to update the corresponding
    # JavaScript widget state (defaultModelProperties) in src/TextWidget.tsx

    # expects as input
    text: str = Unicode("", help="text to label").tag(sync=True)
    labels: list[str] = List(
        trait=Unicode(), help="list of labels to label `text` with"
    ).tag(sync=True)
    colors: list[Color] = List(
        trait=Color(), help="list of colors to label `text` with (in hex format)"
    ).tag(sync=True)

    # expects as output
    result: Result = List(
        trait=Dict(
            per_key_traits={"start": Integer(), "end": Integer(), "label": Unicode()}
        ),
        default_value=[],
        help="result of labeling, list of dicts with keys `start`, `end` and `label`",
    ).tag(sync=True)
    finished: bool = Bool(
        False,
        help="special state triggered by labeler meaning that there is nothing to label",
    ).tag(sync=True)

    @validate("labels")
    def _validate_labels(self: Self, proposal: ProposalType[Self]):
        """
        checks that each label has color

        checks that label in result are in labels
        """
        labels: list[str] = proposal["value"]
        colors: list[str] = proposal["owner"].colors
        result: Result = proposal["owner"].result

        # validate `labels` and `colors`

        # labels and colors have the same number of unique elements
        if len(set(labels)) != len(set(colors)):
            raise TraitError("`colors` must be same length as `labels`")

        # validate `labels` and `result`

        # labels that are used in `result` but aren't in `labels`
        unknown_labels = set([r["label"] for r in result if r["label"] not in labels])

        # if there is one unklnown label (for error readability)
        if len(unknown_labels) == 1:
            raise TraitError(
                f"`result` uses a label '{list(unknown_labels)[0]}' which is not present in `labels`"
            )
        # if there are multiple unknown labels
        elif len(unknown_labels) > 1:
            raise TraitError(
                f"`result` uses labels which are not present in `labels` ({', '.join(unknown_labels)})"
            )

        return labels

    @validate("colors")
    def _validate_colors(self: Self, proposal: ProposalType[Self]):
        """
        checks that each label has color
        """
        labels: list[str] = proposal["owner"].labels
        colors: list[str] = proposal["value"]

        # labels and colors have the same number of unique elements
        if len(set(labels)) != len(set(colors)):
            raise TraitError("`colors` must be same length as `labels`")

        return colors

    @validate("result")
    def _validate_result(self: Self, proposal: ProposalType[Self]):
        """
        checks that label in result are in labels

        check that result doesn't have overlaping labels
        """
        labels: list[str] = proposal["owner"].labels
        result: Result = proposal["value"]

        # validate `labels` and `result`

        # labels that are used in `result` but aren't in `labels`
        unknown_labels = set([r["label"] for r in result if r["label"] not in labels])

        # if there is one unklnown label (for error readability)
        if len(unknown_labels) == 1:
            raise TraitError(
                f"`result` uses a label '{list(unknown_labels)[0]}' which is not present in `labels`"
            )
        # if there are multiple unknown labels
        elif len(unknown_labels) > 1:
            raise TraitError(
                f"`result` uses labels which are not present in `labels` ({', '.join(unknown_labels)})"
            )

        # validate `result`

        for result_i, result_j in combinations(result, 2):
            if spans_overlap(
                (result_i["start"], result_i["end"]),
                (result_j["start"], result_j["end"]),
            ):
                raise TraitError(
                    f"result elements overlap ({result_i} overlaps with {result_j})"
                )

        return result
