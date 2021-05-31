import {useState, useRef, useEffect} from 'react';
import {ViewModel} from '../ViewModels/Interfaces';

// const [viewModel, setViewModel] = useViewModel(new FormViewModel(initState));
export function useViewModel<T extends ViewModel>(initialViewModel: T) {
  const [state, setState] = useState(initialViewModel.serialized);
  const ctor = initialViewModel.constructor
  const currentViewModel: T = new (<any>ctor)(state);

  const setViewModel = (nextViewModel: T) => {
    setState(nextViewModel.serialized);
  };
  return [currentViewModel, setViewModel] as [T, typeof setViewModel];
}

// Not needed
export function useViewModelRef<T extends ViewModel>(initialViewModel: T) {
  const [state, setState] = useState(initialViewModel.serialized);
  const ctor = initialViewModel.constructor
  const currentViewModel: T = new (<any>ctor)(state);

  const refViewModel = useRef(currentViewModel);
  useEffect(() => {
    refViewModel.current = currentViewModel;
  });

  const setViewModel = (setter: (viewModel: T) => void) => {
    const viewModel = refViewModel.current;
    setter(viewModel)
    setState(viewModel.serialized);
  };

  return [refViewModel.current, setViewModel] as [T, typeof setViewModel];
};

export default {useViewModelRef};
