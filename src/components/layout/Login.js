import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'

export const LoginLayout = ({ children }) => {
    return (
        <StyledRow justify="center">
            <Col span={6}></Col>
            <Col span={12}>{children}</Col>
            <Col span={6}></Col>
        </StyledRow>
    )
}

const StyledRow = styled(Row)`
    margin-top: 200px;
`
