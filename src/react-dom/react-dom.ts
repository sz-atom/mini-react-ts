import { ReactDomRootInterface, InternalRoot } from '../types/type';
import { createFiber } from '../react-reconciler/reactFiber';
import { scheduleUpdateOnFiber } from '../react-reconciler/reactFiberWorkLoop';

class ReactDomRoot implements ReactDomRootInterface{

    _internalRoot:InternalRoot;

    constructor (_internalRoot) {
        this._internalRoot = _internalRoot;
    }

    render(element) {
        let { containerInfo:container } = this._internalRoot;
        let fiber = createFiber(element, {
            type: container.nodeName.toLocaleLowerCase(),
            stateNode: container
        });
        scheduleUpdateOnFiber(fiber);
    }

}

export function createRoot(container:HTMLElement):ReactDomRoot {
    return new ReactDomRoot({ containerInfo: container });
}