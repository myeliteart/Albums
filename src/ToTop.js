import { ref, onMounted } from 'vue'

    export function useToTop() {
    const top = ref (false);

      const topYes = () =>{
        if(window.scrollY > 200) {
          top.value = true
        } else {
          top.value = false
        }
      }
    
      const backToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })  
      }

      onMounted (() => {
        window.addEventListener("scroll", topYes);
      })

    return { top, topYes, backToTop } 
}