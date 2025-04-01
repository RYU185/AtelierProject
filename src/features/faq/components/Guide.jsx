import React from "react";

function Guide() {
  return (
    <div className="guide-main">
      <h2>이용 안내</h2>
      <div className="guide-content">
        <p>전시장 및 서비스 이용에 관한 정보를 확인하실 수 있습니다.</p>
        <ul>
          <li>관람 시간: 오전 10시 ~ 오후 7시 (매주 월요일 휴관)</li>
          <li>입장료: 성인 10,000원, 학생 7,000원, 미취학 아동 무료</li>
          <li>단체 관람은 사전 예약 필수</li>
        </ul>
      </div>
    </div>
  );
}

export default Guide;
