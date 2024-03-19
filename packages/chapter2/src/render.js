export function jsx(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === 'function') return child()
        return child
      }),
    },
  }
}

export function createElement(node) {
  /*
  // 만약 node가 문자열이라면 텍스트 노드로 생성
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  
  // 그 외에는 element 노드 생성
  const element = document.createElement(node.type);
  
  // 속성 설정
  updateAttributes(element, node.props);
  
  // 자식 노드 추가
  node.children.forEach(child => {
    const childElement = createElement(child);
    element.appendChild(childElement);
  });
  
  return element;
  */
  const el = document.createElement(node.type)

  const { children, ...otherProps } = node.props
  if (otherProps !== null) {
    updateAttributes(el, {}, otherProps)
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      typeof child === 'string' ? (el.innerHTML = child) : el.appendChild(createElement(child))
    })
  }
  return el
}

function updateAttributes(target, newProps, oldProps) {
  /*
  // newProps들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target에 해당 속성을 새 값으로 설정
  if (newProps) {
    for (const [key, value] of Object.entries(newProps)) {
      if (oldProps && oldProps[key] === value) {
        // 새로운 속성이 이전과 동일하다면 변경 불필요
        continue;
      }
      target.setAttribute(key, value); // 새로운 속성으로 설정
    }
  }

  // oldProps을 반복하여 각 속성 확인
  //   만약 newProps들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps들에 해당 속성이 존재하지 않는다면
  //     target에서 해당 속성을 제거
  if (oldProps) {
    for (const key in oldProps) {
      if (!(key in newProps)) {
        // 이전 속성이 새로운 속성에 없다면 제거합니다.
        target.removeAttribute(key);
      }
    }
  }
  */
  Object.keys(newProps).forEach((prop) => {
    if (prop !== 'children' && newProps[prop] !== oldProps[prop]) {
      target.setAttribute(prop, newProps[prop])
    }
  })
  Object.keys(oldProps).forEach((prop) => {
    if (!(prop in newProps) && prop !== 'children') {
      target.removeAttribute(prop)
    }
  })
  if (Object.keys(newProps).length === 0) {
    Object.keys(oldProps).forEach((prop) => {
      if (prop !== 'children') {
        target.setAttribute(prop, oldProps[prop])
      }
    })
  }
}

export function render(parent, newNode, oldNode, index = 0) {
  /*
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  //   종료s
  if (newNode === null && oldeNode !==null) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }
      
  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if(newNode !== null && oldNode === null) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if(typeof newNode !== typeof oldNode || (typeof newNode === 'string' && newNode !== oldNode)) {
    if(typeof newNode === 'string') {(
      parent.replaceChild(document.createTextNode(newNode), parent.childNodes[index]));
    }else {
      return;
    } 
    return;
  } 
  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if(typeof newNode !== typeof oldNode) {
    //oldNode.type = newNode.type;
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 5. newNode와 oldNode에 대해 updateAttributes 실행
  updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  const length = Math.max(newNode.children.length, oldNode.children.length);
   for(let i=0; i < length; i++) {
    render(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
  }*/
  if (!oldNode) {
    parent.appendChild(createElement(newNode))
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index])
  } else if (isChanged(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index])
  } else if (newNode.type) {
    updateAttributes(parent.childNodes[index], newNode.props, oldNode.props)

    const newLength = newNode.props.children.length
    const oldLength = oldNode.props.children.length

    for (let i = 0; i < newLength || i < oldLength; i++) {
      render(parent.childNodes[index], newNode.props.children[i], oldNode.props.children[i], i)
    }
  }
}

function isChanged(node1, node2) {
  return typeof node1 !== typeof node2 || (typeof node1 === 'string' && node1 !== node2) || node1.type !== node2.type
}