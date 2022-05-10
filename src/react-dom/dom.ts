export function insertOrAppendPlacementNode(parent, before, node) {
    parent.insertBefore(before, node);
}

// 更新dom节点（dom元素旧的props参数，新的props参数，旧props参数还原，新props参数赋值）
export function updateNode(node, preProps, newProps) {

}

export function commitDeletions(deletions, node) {}