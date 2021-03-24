//引入BackTop组件
import BackTop from "content/backTop/backtop"

export const backTopMixin={
    data(){
        return {
            isShow:false
        }
    },
    components:{
        BackTop
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0);
        }
    }
}