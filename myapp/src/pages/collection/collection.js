import React, { Component } from 'react';
import { Drawer, Icon } from 'antd-mobile';
import { connect } from 'react-redux'
import axios from "axios"
import "./collection.css"
import '../index/index.css'

class Collection extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            collectionList: []
        }
    }


    componentDidMount() {
        console.log(this.props.list)
        for (let i of this.props.list) {
            axios({
                url: "/story/" + i,
                method: "get"
            }).then(res => {
                let { title, image, id } = res.data
                this.setState({
                    collectionList: [...this.state.collectionList, { title, image, id }]
                })
            })
        }
    }


    onOpenChange = () => {
        console.log(1)
        this.setState({ open: !this.state.open });
    }

    toIndex = () => {
        this.props.history.push('/index')
    }

    onDetail=(e)=>{
        const id=e.currentTarget.id;
        console.log(e.currentTarget,id,e)
        const path=`/detail?id=${id}`
        this.props.history.push(path);
    }


    render() {
        const sidebar = (
            <div className="sidebar">
                <div className="name">
                    <img src="https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png" />
                    <p>谜亚星</p>
                </div>
                <div className='show'>
                    <div className="collect">
                        <Icon type="ellipsis" />
                        <span>我的收藏</span>
                    </div>
                    <div className="download">
                        <Icon type="ellipsis" />
                        <span>离线下载</span>
                    </div>
                </div>
                <div className="index" onClick={() => { this.toIndex() }}>
                    <Icon type="ellipsis" />
                    <span>首页</span>
                </div>
            </div>
        );
        return (
            <div>
                <nav className="nav" >
                    <div>
                        <Icon type="ellipsis" onTouchStart={() => { this.onOpenChange() }} />
                        <span>我的收藏</span>
                    </div>
                </nav>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <div className="content">
                        <div className='list'>
                            {this.state.collectionList.length>0?<div>{
                                this.state.collectionList.map((item) =>
                                    <div className="card" key={item.id} id={item.id} onClick={(e) => { this.onDetail(e) }}>
                                        <p>{item.title}</p>
                                        <img src={item.image} />
                                    </div>
                                )
                            }</div>:null}
                            
                        </div>

                    </div>

                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.collectChange
    }
}


export default connect(
    mapStateToProps,
)(Collection);
