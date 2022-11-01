import { merge } from './merge.js'

export function testCases(e){
  /**
  * test function
  * @param {string} desc
  * @param {function} fn
  */
  
    function it(desc, fn) {
      try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
      } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
      }
  }

    function assert(isTrue) {
      if (!isTrue) {
        throw new Error();
      }
    }

    it('should merge without duplicates', function () {
      let arr1 = [
                  {
                  "name": "Gangplank Drop",
                  "theme": "pirate",
                  "type": "flat",
                  "cost": 1657000,
                  "est_cust": 1138,
                  "maintenance_time": 30,
                  "workers": 3,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name": "Unreasonable Force",
                  "theme": "extreme",
                  "type": "coaster",
                  "cost": 3705000,
                  "est_cust": 3581,
                  "maintenance_time": 15,
                  "workers": 3,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name": "Irrational Ramen",
                  "theme": "extreme",
                  "type": "food",
                  "cost": 68000,
                  "est_cust": 125,
                  "maintenance_time": 35,
                  "workers": 3,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name": "Sailor Mountain",
                  "theme": "pirate",
                  "type": "coaster",
                  "cost": 1598000,
                  "est_cust": 990,
                  "maintenance_time": 10,
                  "workers": 2,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name": "Carnivore Candy",
                  "theme": "zoo",
                  "type": "shop",
                  "cost": 35000,
                  "est_cust": 63,
                  "maintenance_time": 10,
                  "workers": 5,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  }
                ]

    let arr2 = [
                  {
                  "name": "Radical Hot Dogs",
                  "theme": "extreme",
                  "type": "food",
                  "cost": 89000,
                  "est_cust": 139,
                  "maintenance_time": 39,
                  "workers": 3,
                  "updated_at": "2022-05-15T15:12:59.152Z"
                  },
                  {
                  "name": "Unreasonable Force",
                  "theme": "extreme",
                  "type": "coaster",
                  "cost": 3705000,
                  "est_cust": 3581,
                  "maintenance_time": 15,
                  "workers": 3,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name": "Zombie Hot Dogs",
                  "theme": "spooky",
                  "type": "food",
                  "cost": 128000,
                  "est_cust": 64,
                  "maintenance_time": 12,
                  "workers": 3,
                  "updated_at": "2022-05-15T15:12:59.152Z"
                  },
                  {
                  "name": "Sailor Pins",
                  "theme": "pirate",
                  "type": "shop",
                  "cost": 89000,
                  "est_cust": 123,
                  "maintenance_time": 26,
                  "workers": 5,
                  "updated_at": "2022-05-15T15:12:59.152Z"
                  },
                  {
                  "name": "Sailor Mountain",
                  "theme": "pirate",
                  "type": "coaster",
                  "cost": 1598000,
                  "est_cust": 990,
                  "maintenance_time": 10,
                  "workers": 2,
                  "updated_at": "2022-06-15T15:12:59.152Z"
                  }
                  ]

  let expected = [
                  {
                  "name":"Gangplank Drop",
                  "theme":"pirate",
                  "type":"flat",
                  "cost":1657000,
                  "est_cust":1138,
                  "maintenance_time":30,
                  "workers":3,
                  "updated_at":"2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name":"Unreasonable Force",
                  "theme":"extreme",
                  "type":"coaster",
                  "cost":3705000,
                  "est_cust":3581,
                  "maintenance_time":15,
                  "workers":3,
                  "updated_at":"2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name":"Irrational Ramen",
                  "theme":"extreme",
                  "type":"food",
                  "cost":68000,
                  "est_cust":125,
                  "maintenance_time":35,
                  "workers":3,
                  "updated_at":"2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name":"Sailor Mountain",
                  "theme":"pirate",
                  "type":"coaster",
                  "cost":1598000,
                  "est_cust":990,
                  "maintenance_time":10,
                  "workers":2,
                  "updated_at":"2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name":"Carnivore Candy",
                  "theme":"zoo",
                  "type":"shop",
                  "cost":35000,
                  "est_cust":63,
                  "maintenance_time":10,
                  "workers":5,
                  "updated_at":"2022-06-15T15:12:59.152Z"
                  },
                  {
                  "name":"Radical Hot Dogs",
                  "theme":"extreme",
                  "type":"food",
                  "cost":89000,
                  "est_cust":139,
                  "maintenance_time":39,
                  "workers":3,
                  "updated_at":"2022-05-15T15:12:59.152Z"
                  },

                  {
                  "name":"Zombie Hot Dogs",
                  "theme":"spooky",
                  "type":"food",
                  "cost":128000,
                  "est_cust":64,
                  "maintenance_time":12,
                  "workers":3,
                  "updated_at":"2022-05-15T15:12:59.152Z"
                  },
                  {
                  "name":"Sailor Pins",
                  "theme":"pirate",
                  "type":"shop",
                  "cost":89000,
                  "est_cust":123,
                  "maintenance_time":26,
                  "workers":5,
                  "updated_at":"2022-05-15T15:12:59.152Z"
                  }
                  ]
      
  const testIfEqual = (a1, a2) => {
    let found_final = []
    let found_curr = []
    
    if(a1.length === a2.length) {
      found_final = []
      a1.forEach( i1 => {
        found_curr = []
        a2.forEach( i2 => { 
          found_curr.push(ifObjectsEqual(i1, i2)) 
        })
        found_final.push(found_curr.some( i => i === true))                      
      }) 
    } 
    return found_final.every(i => i === true)
    }

  const ifObjectsEqual = (o1, o2) => {
    let matched = false
    if(typeof o1 === 'object' && Object.keys(o1).length > 0) {
      matched = (Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => ifObjectsEqual(o1[p], o2[p])))
    }else {
      matched = (o1 === o2)
    }
    return matched
    }
      
  let merged_arr = merge(arr1, arr2)
  assert(testIfEqual(expected, merged_arr));
  });    
}