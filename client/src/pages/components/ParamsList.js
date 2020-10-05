import React, {PureComponent} from 'react'
import { getActiveParamsOnpage } from '../../redux/actions/data_actions/paramActions'
import { connect } from 'react-redux'

class ParamsList extends PureComponent{

    state={
        params_onpage: null
    }

    componentDidMount(){
        const {page, params_list} = this.props
        if (params_list.length === 0){
            this.props.getActiveParamsOnpage(page)
        }
    }

    componentDidUpdate(prevProps) {
        const { params_list,page } = this.props
        if((params_list !== prevProps.params_list) && params_list.length !== 0 ){
            this.setState({params_onpage: params_list.filter(param=>param.page === page)})
        }
    }

    render(){
        const {params_onpage} = this.state
        return(
            params_onpage && params_onpage.map((param, index)=>{                    
                return <div key={param._id}>
                   <ParamComponent param={param} index={index}/>
                </div>
            })
        )
    }
}

const mapStateToProps = state => ({
    params_list: state.param.params_list_onpage
})

export default connect(
    mapStateToProps,
    {getActiveParamsOnpage}
)(ParamsList)

export function ParamComponent({param, index}) {
    return  <section id={param.title} className="param-onpage">
    <div className="container">
        {param.img ? 
        <div className="row no-gutters justify-content-between align-content-center">
            <div className="col-md-6">
                <div className={`text-param-onpage param-onpage__${index} ${index % 2 ===0 ? '' : 'text-right'}`} dangerouslySetInnerHTML={{ __html: param.text }}/>
            </div>
            <div className={`col-md-6 ${index % 2 === 0 ? 'text-right' : 'order-md-first' }`}>
                <img className="img-param-onpage img_block" src={param.img} alt={param.title}/>
            </div>
        </div> : 
        <div className={`text-param-onpage param-onpage__${index}`} dangerouslySetInnerHTML={{ __html: param.text }}/>}
    </div>
</section>
}