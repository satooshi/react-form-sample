import { useState, useRef, useEffect } from 'react';
import { ViewModel } from '../ViewModels/Interfaces';

interface Constructable<T> {
  new (...args: any): T; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// const [viewModel, setViewModel] = useViewModel(new FormViewModel(initState));
export function useViewModel<T extends ViewModel>(initialViewModel: T) {
  const [state, setState] = useState(initialViewModel.serialized);
  const ctor = initialViewModel.constructor as Constructable<T>;
  const currentViewModel: T = new ctor(state); // eslint-disable-line new-cap

  const setViewModel = (nextViewModel: T) => {
    setState(nextViewModel.serialized);
  };

  return [currentViewModel, setViewModel] as [T, typeof setViewModel];
}

// Not needed
export function useViewModelRef<T extends ViewModel>(initialViewModel: T) {
  const [state, setState] = useState(initialViewModel.serialized);
  const ctor = initialViewModel.constructor as Constructable<T>;
  const currentViewModel: T = new ctor(state); // eslint-disable-line new-cap

  const refViewModel = useRef(currentViewModel);
  useEffect(() => {
    refViewModel.current = currentViewModel;
  });

  const setViewModel = (setter: (viewModel: T) => void) => {
    const viewModel = refViewModel.current;
    setter(viewModel);
    setState(viewModel.serialized);
  };

  return [refViewModel.current, setViewModel] as [T, typeof setViewModel];
}
