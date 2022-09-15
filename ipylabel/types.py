from __future__ import annotations

from typing import Any, Generic, TypeVar, List

from traitlets import TraitType

# can be moved to typing in 3.11
from typing_extensions import TypedDict, LiteralString


class OneResult(TypedDict):
    start: str
    end: str
    label: str

# TODO: move to regular list in the future
Result = List[OneResult]


T = TypeVar("T")


class ProposalType(TypedDict, Generic[T]):
    trait: Any
    value: Any
    owner: T


POSSIBLE_VALUES: set[str] = {
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
}


class Color(TraitType):
    """A trait for color representations

    should be compatible with CSS3 specification but isn't
    currently only hexadecimal value on length 6 is supporeted
    maybe make it a wrapper on https://pydantic-docs.helpmanual.io/usage/types/#color-type
    """

    default_value = "#000000"
    info_text = "a color in hexadecimal representation without alpha chanel"

    def validate(self, obj, value):
        if isinstance(value, str):
            if len(value) == 7:
                if all(el in POSSIBLE_VALUES for el in value[1:].lower()):
                    return value.lower()
        self.error(obj, value)

    def from_string(self, s: str):
        if self.allow_none and s == "None":
            return None
        if len(s) != 7:
            raise ValueError("length must be exactly 7, got %d" % len(s))
        if not s.startswith("#"):
            raise ValueError("must start with #, got %s" % s[0])
        if not all(el in POSSIBLE_VALUES for el in s[1:].lower()):
            raise ValueError("must start with #, got %s" % s[0])
        return s.lower()
