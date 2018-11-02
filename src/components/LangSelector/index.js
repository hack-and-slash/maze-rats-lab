import React from 'react'
import { withRouter } from 'react-router-dom'
import { Select } from 'semantic-ui-react'

const LangSelector = withRouter(({history, location}) => {
    let countryOptions = [
        { key: 'ptbr', value: 'ptbr', flag: 'br', text: 'Brazillian Portuguese' },
        { key: 'en', value: 'en', flag: 'us', text: 'English' }
    ]
    return (
        <Select style={{ fontSize: 10, width:"200px" }} onChange={(e,{k, value}) => history.push(location.pathname+'?lang='+value)} placeholder='Change language' options={countryOptions} />
    )
})

export default LangSelector