import { MiniFiber } from '../types/type';
import { reconcileChildren } from './reactChildFiber';
import { renderWithHooks } from './hooks';

export function updateFunctionComponent(fiber: MiniFiber) {
    renderWithHooks(fiber);
    let { type, props } = fiber;
    let children = type(props);
    reconcileChildren(children);
}