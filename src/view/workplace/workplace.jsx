import './workplace.css';
import React from 'react';

import {Layout} from 'antd';
import {RosterService} from "../../service/roster.service";

const {Header, Footer, Sider, Content} = Layout;

/**
 * @author wildhunt
 * @data 2020-10-27
 */
export class WorkPlace extends React.Component {
    rosterService = new RosterService();

    state = {
        rosterInfo: []
    };

    componentDidMount() {
        this.rosterService.getRosterByGroup({
            params: {groupId: "eecc293ffced7bfac730f61116bebff8"},
            success: (data) => {

                this.setState({
                    rosterInfo: data
                })
            }
        })
    }

    getRosterListView() {

        let rosterInfoList = this.state.rosterInfo;
        let nameList = [];

        for (let i = 0; i < rosterInfoList.length; i++) {
            nameList.push(<td>{rosterInfoList[i].name}</td>)
        }

        let lineCount = rosterInfoList.length / 10;
        let trs = [];
        for (let i = 0; i < lineCount; i++) {
            trs.push(<tr>{WorkPlace.getLine(nameList, i, 10)}</tr>)
        }
        return (<table>{trs}</table>)
    }

    static getLine(tds, index, limit) {
        let ret = [];
        let cur = index * limit;
        for (let i = cur; i < tds.length && i < cur + limit; i++) {
            ret.push(tds[i])
        }
        return ret;
    }

    render() {
        return (
            <Layout>
                {this.getRosterListView()}
                <Header className="property-header">Header</Header>
                <Layout className="property-content">
                    <Sider>Sider</Sider>
                    <Content>{this.getRosterListView()}</Content>
                </Layout>
                <Footer className="property-footer">Footer</Footer>
            </Layout>
        )
    }
}