import MyTask from "./MyTask.js";

export default class DoTask extends MyTask{
    constructor(description){
        super(description);
        this.status = "do";
    };
}