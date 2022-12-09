import MyTask from "./MyTask";

export default class DoneTask extends MyTask{
    constructor(description){
        super(description);
        this.status = "done";

    }
}