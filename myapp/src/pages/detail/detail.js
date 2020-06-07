import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Share from '../../compoents/share/share'
import axios from "axios"
import { connect } from 'react-redux'
import { addid, deleteid } from '../../store/action'
import "./detail.css"

class Detail extends Component {
    constructor() {
        super()
        this.state = {
            rawHtmlData: { __html: <div></div> },
            imgSrc: '',
            imgTitle: '',
            longcomment: 0,
            shortcomment: 0,
            share: false,
            isCollect: false
        }
    }
    componentDidMount() {
        console.log(this.props.list)
        const id = this.props.location.search.substr(4)
        if (this.props.list.includes(id)) {
            this.setState({
                isCollect: true
            })
        }
        axios({
            url: "/story/" + id,
            method: "get"
        }).then(res => {
            console.log(res.data)
            this.setState({
                rawHtmlData: {
                    __html: res.data.body // 注意，必须是这种格式
                },
                imgSrc: res.data.image,
                imgTitle: res.data.title
            })
        })
        axios({
            url: `/story/${id}/long-comments`,
            method: "get"
        }).then(res => {
            console.log(res.data)
            this.setState({
                longcomment: res.data.comments.length
            })
        })
        axios({
            url: `/story/${id}/short-comments`,
            method: "get"
        }).then(res => {
            console.log(res.data)
            this.setState({
                shortcomment: res.data.comments.length
            })
        })
    }

    back = () => {
        this.props.history.go(-1)
    }

    toDetail = () => {
        const id = this.props.location.search.substr(4)
        console.log(id)
        const path = `/comment?id=${id}`
        this.props.history.push(path);
    }

    toShare = () => {
        this.setState({
            share: !this.state.share
        })
        document.documentElement.style.overflow = "hidden"
    }

    onCancel = () => {
        this.setState({
            share: false
        })
        document.documentElement.style.overflow = ""
    }

    changeCollect = () => {
        const id = this.props.location.search.substr(4)
        console.log(1, this.props.addId)
        
        if (this.state.isCollect) {
            this.setState({
                isCollect: false
            })
            console.log(3)
            this.props.deleteId(id)
            console.log(this.props.list)
        } else {
            this.setState({
                isCollect: true
            })
            console.log(2)
            this.props.addId(id)
            console.log(this.props.list)
        }

    }


    render() {
        return (
            <div>
                <header className="header">
                    <div className='back' onClick={() => { this.back() }}>
                        <Icon type="ellipsis" />
                    </div>
                    <div className="right">
                        <div className='share-icon' onClick={() => { this.toShare() }}><Icon type="ellipsis" /></div>
                        <div className='collect' style={this.state.isCollect ? { color: '#000' } : { color: '#fff' }} onClick={() => { this.changeCollect() }}><Icon type="ellipsis" /></div>
                        <div className='comment' onClick={() => { this.toDetail() }}><Icon type="ellipsis" /><span>{this.state.longcomment + this.state.shortcomment}</span></div>
                        <div className='like'><Icon type="ellipsis" /><span>25</span></div>
                    </div>
                </header>
                <div className='detail-content' dangerouslySetInnerHTML={this.state.rawHtmlData}>
                </div>
                <div className='topimg'>
                    <img src={this.state.imgSrc}></img>
                    <p>{this.state.imgTitle}</p>
                </div>
                {this.state.share ? <Share onCancel={this.onCancel}></Share> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.collectChange
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addId: (id) => dispatch(addid(id)),
        deleteId: (id) => dispatch(deleteid(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
