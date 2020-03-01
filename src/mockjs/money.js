import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 60
let typelist = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    income: Mock.Random.integer(0, 9999),
    pay: Mock.Random.integer(0, 9999), 
    accoutCash: Mock.Random.integer(0, 9999),
    'incomePayType|1': typelist
  }))
}

export default {
  getMoneyList: config => {
    const { name, page = 1, limit = 20 } = mUtils.param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.username.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        moneyList: pageList
      }
    }
  },
  createMoney: config => {
    const { username, address, income, pay , accoutCash, incomePayType,tableAddress } = mUtils.param2Obj(config.url)
    List.unshift({
      id: Mock.Random.guid(),
      username: username,
      address: address,
      tableAddress:tableAddress,
      createTime: Mock.Random.now(),
      income: income,
      pay: pay,
      accoutCash: accoutCash,
      incomePayType: incomePayType
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteMoney: config => {
    const { id } = mUtils.param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        data: {
          message: '删除成功'
        }
      }
    }
  },

  batchremoveMoney: config => {
    console.log(config);
    // console.log(mUtils.param2Obj(config.url));
    let { ids } = mUtils.param2Obj(config.url)
    console.log(ids);
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },

  updateMoney: config => {
    const { id,username, address, income, pay , accoutCash, incomePayType } = mUtils.param2Obj(config.url)
    List.some(u => {
      if (u.id === id) {
        u.username = username
        u.address = address
        u.income = income
        u.pay = pay
        u.accoutCash = accoutCash
        u.incomePayType = incomePayType
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}