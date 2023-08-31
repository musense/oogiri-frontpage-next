import React, { useRef, useState, useEffect } from 'react';
import styles from './css/contactUs.module.css';
import EnterBox from "./EnterBox";
import CheckBoxList from './CheckBoxList';
import Image from 'next/image';
import { contactUs, imageDown } from "@components/index/images";
import useLoadImage from "@services/useLoadImage";
import { createPortal } from 'react-dom'
import useModalRootRef from '@services/useModalRootRef'

const enterBoxList = [
  { title: '公司/品牌名稱', name: 'company-name', typ: 'text' },
  { title: '姓名', name: 'name', typ: 'text' },
  { title: '電話', name: 'phone', typ: 'tel' },
  { title: '電子信箱', name: 'email', typ: 'email' },
]

export default function ContactUs() {


  return (
    <div id="contact" className={styles['contact-us-wrapper']}>
      {/* {contactUsImage && <Image
        alt=""
        src={contactUsImage.default.src}
        width={contactUsImage.default.width}
        height={contactUsImage.default.height}
        style={{
          width: '100%',
          objectFit: 'contain'
        }}
      />} */}
      <div className={styles['contact-us-content']}>
        {/* <div className={styles['img-wrapper']}>
          {imageDownImage && <Image
            alt=""
            className={styles['image-down']}
            src={imageDownImage.default.src}
            width={imageDownImage.default.width}
            height={imageDownImage.default.height}
            style={{
              width: '100%',
              objectFit: 'contain'
            }}
          />}
          <div className={styles['orange-box']} />
        </div> */}
        <form
          name='contactForm'
          className={styles['contact-us-form']}
        >

          <div className={styles['left-form']}>
            {
              enterBoxList.map((enterBox, index) => (
                <EnterBox
                  styles={styles}
                  key={index}
                  title={enterBox.title}
                  name={enterBox.name}
                  type={enterBox.type}
                />
              ))
            }
          </div>

          <div className={styles['right-form']}>

            <CheckBoxList
              styles={styles}
            />
            <EnterBox
              large
              styles={styles}
              title={'其他需求'}
              name={'ask'}
              type={'text'}
            />
            <button
              title='send button'
              className={styles['send-button']}
              type='submit'
            />
          </div>

        </form>
      </div>
    </div>
  );
}


