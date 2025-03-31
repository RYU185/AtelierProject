import React from 'react'
import styled from 'styled-components'

CardWrap = styled.div`
    width: 300px;
    border: 1px solid black;
    
`

function GoodsCard() {
  return (
    <CardWrap>
        <img 
        src='/src/assets/GoodsIMG/goods1.jpg'
        alt='1번 굿즈 이미지' />
        <h3>TITLE</h3>
        <p>20000원</p>
    </CardWrap>
  )
}

export default GoodsCard