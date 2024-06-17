// mapPlugin.js  
export default {  
    install(Vue, options) {  
      if (!window.TMap) {
        // 加载腾讯地图 API 脚本  
        const script = document.createElement('script');  
        script.src = `https://map.qq.com/api/gljs?v=1.exp&libraries=service&key=${options.mapKey}`;  
        script.onload = () => {  
          // 脚本加载完成后，TMap 已经是全局的  
        };  
        document.body.appendChild(script);
      }  
      // 可以在这里添加其他全局方法或属性
    }  
  };  
  