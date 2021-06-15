import { isArray } from './index';
import { createBlock, openBlock, VNode, Fragment, VNodeChild } from 'vue';

import type { VNodeTypes } from 'vue';

type Children = VNodeTypes[] | VNodeTypes;
const Template = 'template';

export const isComment = (node: VNodeChild) => (node as VNode).type === Comment;
export const isTemplate = (node: VNodeChild) => (node as VNode).type === Template;
export const isFragment = (node: VNodeChild) => (node as VNode).type === Fragment;
export const isText = (node: VNodeChild) => (node as VNode).type === Text;

export enum PatchFlags {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  HOISTED = -1,
  BAIL = -2,
}

export function renderBlock(
  node: VNodeTypes,
  props: any,
  children?: Children,
  patchFlag?: number,
  patchProps?: string[]
) {
  return (openBlock(), createBlock(node, props, children, patchFlag, patchProps));
}

export function getChildrenNode(node: VNode, maxDepth: number): VNode | undefined {
  if (isComment(node)) return;
  if (isTemplate(node) || isFragment(node)) {
    return maxDepth > 0 ? getFirstNode(node.children as VNodeChild, maxDepth - 1) : undefined;
  }
  return node;
}
export function getFirstNode(nodes: VNodeChild, maxDepth: number = 3): ReturnType<typeof getChildrenNode> {
  if (isArray(nodes)) {
    return getChildrenNode(nodes[0] as VNode, maxDepth);
  }
  return getChildrenNode(nodes as VNode, maxDepth);
}
