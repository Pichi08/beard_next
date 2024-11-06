"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { decrement, increment, initCount } from "@/store/counter/counterSlice";
import { useEffect } from "react";

interface Props {
  value?: number;
}

export const CartCounter = ({ value = 0 }: Props) => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCount(value));
  }, [dispatch, value]);

  return (
    <div className="flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full absolute -top-2 -right-2 text-xs font-bold">
      {count}
    </div>
  );
};
