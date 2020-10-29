import {AbstractService} from "./abstract.service";


export class RosterService extends AbstractService {
    /**
     * 根据id得到商品信息
     * @param request 参数
     */
    getRosterByGroup = (request) => {
        console.log('根据group查看');
        this.get({
            url: '/api/roster/query',
            request: request
        });
    };
}