import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  const renderContext = {
    $root: null,
    rootComponent: null,
    currentNode: null,
    beforeNode: null, //없어도됨 currentNode때문에
  }

  const _render = () => {
    const currentNode = renderContext.rootComponent();

    updateElement(renderContext.$root, currentNode, renderContext.currentNode);
    resetHookContext();

    renderContext.currentNode = currentNode;
  };

  function render($root, rootComponent) {
    renderContext.$root = $root;
    renderContext.rootComponent = rootComponent;
    renderContext.currentNode = null;
    renderContext.beforeNode = null;
    _render();
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
