import React from 'react';
import InfoOnEditAddress from './InfoOnEditAddress';

const InfoOnEdit = () => {
  return (
    <form>
      <section>
        <div>
          <img src="" alt="" />
          <button>추가</button>
        </div>
        <input type="text" />
      </section>
      <section>
        <div>
          <label htmlFor="email">
            <input type="email" id="email" disabled />
          </label>
        </div>
        <div>
          <label htmlFor="pw">
            <input type="password" id="pw" />
          </label>
          <button>변경하기</button>
        </div>
        <div className="hidden">
          <div>
            <label htmlFor="newPw">
              <input type="password" id="newPw" placeholder="새 비밀번호" />
            </label>
          </div>
          <div>
            <label htmlFor="newPwConfirm">
              <input type="password" id="newPwConfirm" placeholder="새 비밀번호 확인" />
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="name">
            <input type="text" id="name" />
          </label>
        </div>
        <InfoOnEditAddress />
      </section>
    </form>
  );
};

export default InfoOnEdit;
