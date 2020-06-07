import React, { Component } from 'react';
import "./index.css"
// import { Switch, Route, Redirect, NavLink } from "react-router-dom"
import axios from "axios"
import { Drawer,  Icon } from 'antd-mobile';
import { Carousel, WingBlank } from 'antd-mobile';

class Index extends Component {
    constructor() {
        super()
        this.n = 1
        this.state = {
            open: false,
            todayData: [],
            bannerData: [],
            anotherDayData: [],
            arr: [1]
        }
    }
    componentDidMount() {
        if (this.state.todayData.length === 0 || this.state.bannerData.length === 0) {
            axios({
                url: "/stories/latest",
                method: "get"
            }).then(res => {
                this.setState({
                    todayData: res.data.stories,
                    bannerData: res.data.top_stories
                })
            })
        }
        window.onscroll = () => {
            const wh = document.documentElement.clientHeight;
            const dh = document.documentElement.offsetHeight
            const st = document.documentElement.scrollTop || document.body.scrollTop;
            const { show, params } = this.getTime(this.n)
            if (wh + st + 5 >= dh) {
                this.n++;
                axios({
                    url: "/stories/before/" + params,
                    method: "get"
                }).then(res => {
                    this.setState({
                        anotherDayData: [...this.state.anotherDayData, res.data]
                    })
                })
            }

        }
    }

    componentWillUnmount(){
        window.onscroll=null;
    }

    onDetail=(e)=>{
        const id=e.currentTarget.id;
        console.log(e.currentTarget,id,e)
        const path=`/detail?id=${id}`
        this.props.history.push(path);
    }

    toCollection=()=>{
        this.props.history.push('/collection');
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open })
    }
    getTime(n) {
        var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);//展示的时间对象
        var paramsDate = new Date(new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000);//发起请求的参数时间对象
        var showM = (showDate.getMonth() + 1 + "").padStart(2, '0')
        var showD = (showDate.getDate() + "").padStart(2, '0')
        var showTime = showM + "月" + showD + "日";

        var paramsY = paramsDate.getFullYear()
        var paramsM = (paramsDate.getMonth() + 1 + "").padStart(2, '0')
        var paramsD = (paramsDate.getDate() + "").padStart(2, '0')
        var paramsTime = paramsY + paramsM + paramsD

        return {
            show: showTime,
            params: paramsTime
        }
    }
    render() {
        console.log(this.state.anotherDayData)
        const sidebar = (
            <div className="sidebar">
                <div className="name">
                    <img src="https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png" />
                    <p>谜亚星</p>
                </div>
                <div className='show'>
                    <div className="collect" onClick={()=>{this.toCollection()}}>
                        <Icon type="ellipsis" />
                        <span>我的收藏</span>
                    </div>
                    <div className="download">
                        <Icon type="ellipsis" />
                        <span>离线下载</span>
                    </div>
                </div>
                <div className="index">
                    <Icon type="ellipsis" />
                    <span>首页</span>
                </div>
            </div>
        );
        return (<div>
            <nav className="nav" >
                <div>
                    <Icon type="ellipsis" onTouchStart={() => { this.onOpenChange() }} />
                    <span>首页</span>
                </div>
                <div>
                    <Icon type="ellipsis" />
                    <Icon type="ellipsis" />
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
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.bannerData.map(val => (
                            <a
                                key={val.id}
                                id={val.id}
                                href="javascript:;"
                                style={{ display: 'inline-block', width: '100%' }}
                                onClick={(e)=>{this.onDetail(e)}}
                            
                            >
                                <img
                                    className='banner-image'
                                    src={val.image}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                                <span className="title">{val.title}</span>
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
                <div className="content">
                    <div className="title">今日热闻</div>
                    <div className="list">
                        {this.state.todayData.map((item) =>
                            <div className="card" key={item.id} id={item.id} onClick={(e)=>{this.onDetail(e)}}>
                                <p>{item.title}</p>
                                <img src={item.images[0]} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="content">
                    {this.state.anotherDayData.map((item) =>
                        <div key={item.date}>
                            <div className="title">{item.date.substr(4, 2)}月{item.date.substr(6, 2)}日新闻</div>
                            <div className="list">
                                {item.stories.map((i) =>
                                    <div className="card" key={i.id} id={i.id} onClick={(e)=>{this.onDetail(e)}}>
                                        <p>{i.title}</p>
                                        <img src={i.images[0]} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Drawer>
        </div>);
    }
}

export default Index;
