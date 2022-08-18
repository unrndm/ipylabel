#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Danil Kireev.
# Distributed under the terms of the Modified BSD License.

"""
Widget for labeling text
"""
from __future__ import annotations

from ipywidgets import DOMWidget
from traitlets import Bool, Dict, Integer, List, Unicode, validate

from ._frontend import module_name, module_version
from .types import Color, ProposalType, Result


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
    text = Unicode("", help="text to label").tag(sync=True)
    labels = List(trait=Unicode(), help="list of labels to label `text` with").tag(
        sync=True
    )
    colors = List(
        trait=Color(), help="list of colors to label `text` with (in hex format)"
    ).tag(sync=True)

    # expects as output
    result = List(
        trait=Dict(
            per_key_traits={"start": Integer(), "end": Integer(), "label": Unicode()}
        ),
        default_value=[],
        help="result of labeling, list of dicts with keys `start`, `end` and `label`",
    ).tag(sync=True)
    finished = Bool(
        False,
        help="special state triggered by labeler meaning that there is nothing to label",
    ).tag(sync=True)

    # check that each label has color, i.e. they are the same length
    @validate("labels", "colors")
    def _check_lengths(self, proposal: ProposalType[TextWidget]):
        # don't want to hardcode
        if proposal["trait"] == self.__class__.labels:
            labels = proposal["value"]
            colors = proposal["owner"].colors

            if len(labels) != len(colors):
                raise ValueError("`labels` must be same shape as `colors`")

            return labels

        elif proposal["trait"] == self.__class__.colors:
            colors = proposal["value"]
            labels = proposal["owner"].labels

            if len(labels) != len(colors):
                raise ValueError("`colors` must be same shape as `labels`")

            return colors
