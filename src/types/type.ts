export interface InternalRoot {
    containerInfo:HTMLElement;
}

interface Ref {}

type child = text | MiniElement | Boolean | null | undefined;

interface props {
    key?: text,
    children?: child | child[],
    ref?: Ref
}

type text = string | number | null;

export interface MiniElement {
    type: text,
    props?: props,

}

export interface ReactDomRootInterface {
    _internalRoot:InternalRoot;
    render(children:any):void;
}