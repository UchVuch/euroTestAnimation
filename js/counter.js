
import { Odometer } from './odometr.js'

const counter1 = document.querySelector('#out1')
  const counter2 = document.querySelector('#out2')
  const counter3 = document.querySelector('#out3')
  if (counter1 && counter2 && counter3) {
    const countUp1 = new i('out1', 1500000000, {plugin: new Odometer({ duration: 2.3, lastDigitDelay: 0 }),
    duration: 3.0,enableScrollSpy: true, separator: '.',});
    const countUp2 = new i('out2', 100, {plugin: new Odometer({ duration: 2.3, lastDigitDelay: 0 }),
    duration: 3.0,enableScrollSpy: true,});
    const countUp3 = new i('out3', 20, {plugin: new Odometer({ duration: 2.3, lastDigitDelay: 0 }),
    duration: 3.0,enableScrollSpy: true,});
  }