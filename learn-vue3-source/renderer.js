const h = (tag,props,children) =>{
    return {
        tag,
        props,
        children
    }
}

const mount = (vnode,container) => {
    //1.创建出真实的原生，并且在vnode上保留el
    const el = vnode.el = document.createElement(vnode.tag)

    //2.处理props
    if(vnode.props){
        for(const key in vnode.props){
            if(key.startsWith("on")){
                el.addEventListener(key.slice(2).toLowerCase(),vnode.props[key])
            }else{
                el.setAttribute(key,vnode.props[key])
            }
        }
    }

    //3.处理children
    if(vnode.children){
        if(typeof vnode.children === 'string'){
            el.textContent = vnode.children
        }else{
            vnode.children.forEach(vnode1 => {
                mount(vnode1, el)
            });
        }

    }
    //讲el挂载在container上面
    container.appendChild(el)
}


const patch = (n1,n2) => {
    console.log(n1,n2)
    if(n1.tag !== n2.tag){
        let n1ParentElement = n1.el.parentElement
        n1ParentElement.removeChild(n1.el)
        mount(n2, n1ParentElement)
    }else{
        //1.取出element对象，并且在n2保存
        const el = n2.el = n1.el

        //2.比较props
        //2.1获取所有的newProps添加到el
        const oldProps = n1.props || {}
        const newProps = n2.props || {}
        for(const key in newProps){
            const newValue = newProps[key]
            const oldValue = oldProps[key]
            if(newValue !== oldValue){
                if(key.startsWith("on")){
                    el.addEventListener(key.slice(2).toLowerCase(),newValue)
                }else{
                    el.setAttribute(key,newValue)
                }
            }
        }
        //2.2删除旧的props
        for(const key in oldProps){
            if(key.startsWith("on")){
                let value = oldProps[key]
                el.removeEventListener(key.slice(2).toLowerCase(),value)
            }

            if(!(key in newProps)){
                el.removeAttribute(key)
            }

        }


        //3.比较chirldren
        const oldChildren = n1.children || []
        const newChildren = n2.children || []

        if(typeof newChildren === "string"){
            if(typeof oldChildren === 'string'){
                if(newChildren != oldChildren){
                    el.textContent = newChildren
                }
            }else{
                el.innerHTML = newChildren
            }
        }else{
            if(typeof oldChildren === 'string'){
                el.innerHTML = ''
                newChildren.forEach(n => {
                    mount(n,el)
                })
            }else{
                let commonLen = Math.min(oldChildren.length, newChildren.length)
            
                for(let i=0; i< commonLen;i++){
                    console.log(oldChildren[i],newChildren[i])
                    patch(oldChildren[i],newChildren[i])
                }
                 if(oldChildren.length <newChildren.length){
                     newChildren.slice(oldChildren.length).forEach(item =>{
                         mount(item,el)
                     })
                 }

                if(oldChildren.length > newChildren.length){
                    oldChildren.slice(newChildren.length).forEach(item => {
                        el.removeChild(item.el)
                    })
                }

            }

       }
    }

}
