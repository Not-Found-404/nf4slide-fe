import React from "react";
import './roster.css';
import {RosterService} from "../../service/roster.service";
import {Button} from 'antd';


export class Roster extends React.Component {
    rosterService = new RosterService();

    state = {
        rosterInfo: [],
        flashTime: 0,
        maxFlashTime: 20
    };

    componentDidMount() {
        this.rosterService.getRosterByGroup({
            params: {groupId: "eecc293ffced7bfac730f61116bebff8"},
            success: (data) => {
                this.initData(data);
            }
        })
    }


    flash() {
        let flashTime = this.state.flashTime;
        flashTime++;
        this.setState({
            flashTime: flashTime
        });
        let maxFlashTime = this.state.maxFlashTime;
        this.flashOnce();
        if (maxFlashTime > flashTime) {
            setTimeout(() => this.flash(), 150);
        } else {
            let initFlashTime = 0;
            this.setState({
                flashTime: initFlashTime
            });
            this.youAreTheChosenOne();
        }
    }

    flashOnce() {
        let rosterInfoList = this.initData();

        let length = rosterInfoList.length;
        let listCount = length / 2;

        for (let i = 0; i < listCount; i++) {
            let choseNum = Math.floor(Math.random() * length);
            rosterInfoList[choseNum].chose = true;
        }

        this.setState({
            rosterInfo: rosterInfoList
        });
    }

    getRosterListView() {
        let rosterInfoList = this.state.rosterInfo;
        let nameList = [];

        for (let i = 0; i < rosterInfoList.length; i++) {
            let className = "roster-content";
            if (rosterInfoList[i].chose) {
                className = className + " , roster-chose";
            } else if (rosterInfoList[i].hidden) {
                className = className + " , roster-hidden";
            }
            nameList.push(<td className={className} key={i}>{rosterInfoList[i].name}</td>)
        }

        let lineCount = rosterInfoList.length / 10;
        let trs = [];
        for (let i = 0; i < lineCount; i++) {
            trs.push(<tr key={i}>{Roster.getLine(nameList, i, 10)}</tr>)
        }
        return (<table>
            <tbody>{trs}</tbody>
        </table>)
    }

    static getLine(tds, index, limit) {
        let ret = [];
        let cur = index * limit;
        for (let i = cur; i < tds.length && i < cur + limit; i++) {
            ret.push(tds[i])
        }
        return ret;
    }

    youAreTheChosenOne() {
        let rosterInfoList = this.state.rosterInfo;
        let length = rosterInfoList.length;
        let theChosenOne = Math.floor(Math.random() * length);

        rosterInfoList.forEach(e => {
            e.chose = false;
            e.hidden = true;
        });

        rosterInfoList[theChosenOne].chose = true;
        rosterInfoList[theChosenOne].hidden = false;

        this.setState({
            rosterInfo: rosterInfoList
        });
    }


    initData(rosterInfoList = this.state.rosterInfo) {
        rosterInfoList.forEach(item => {
            item.chose = false;
            item.hidden = false;
        });

        this.setState({
            rosterInfo: rosterInfoList
        });

        return rosterInfoList;
    }


    render() {
        return (
            <div className="roster-workplace">

                {this.getRosterListView()}
                <Button  type="primary" className={"flash-begin"} onClick={() => this.flash()}>The Chosen One </Button>
            </div>
        )
    }
}