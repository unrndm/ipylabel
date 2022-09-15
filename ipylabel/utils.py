from typing import Tuple

def spans_overlap(first: Tuple[int, int], second: Tuple[int, int]) -> bool:
    first = tuple(map(int, first))
    second = tuple(map(int, second))

    return (
        # overlap on left
        ((first[0] <= second[0]) and (first[1] > second[0]))
        # first in second
        or ((first[0] >= second[0]) and (first[1] <= second[1]))
        # second in first
        or ((first[0] <= second[0]) and (first[1] >= second[1]))
        # overlap on right
        or ((first[0] <= second[1]) and (first[1] > second[1]))
    )
