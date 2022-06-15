import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../state/AppState';

export const useRedux = <S>(selector: (state: AppState) => S, equalityFn?: (left: S, right: S) => boolean) =>
    useSelector<AppState, S>(selector, equalityFn);

export const useAppDispatch: () => AppDispatch = useDispatch;
