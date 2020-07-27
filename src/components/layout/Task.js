import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'

export const TaskLayout = ({ children }) => {
    return (
        <StyledRow justify="center">
            <Col span={2}></Col>
            <Col span={20}>{children}</Col>
            <Col span={2}></Col>
        </StyledRow>
    )
}

const StyledRow = styled(Row)`

`
