const rewire = require("rewire")
const ABLMCCInterface = rewire("./ABLMCCInterface")
const classNameConvert = ABLMCCInterface.__get__("classNameConvert")
const HWBuilder = ABLMCCInterface.__get__("HWBuilder")
const checkAvailability = ABLMCCInterface.__get__("checkAvailability")
const getABLMCC = ABLMCCInterface.__get__("getABLMCC")
const getABLMCCNotices = ABLMCCInterface.__get__("getABLMCCNotices")
const getABLMCCHW = ABLMCCInterface.__get__("getABLMCCHW")
// @ponicode
describe("classNameConvert", () => {
    test("0", () => {
        let callFunction = () => {
            classNameConvert("National Infrastructure Supervisor")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            classNameConvert("Senior Brand Assistant")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            classNameConvert("Product Accountability Executive")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            classNameConvert("Customer Metrics Consultant")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            classNameConvert("Principal Implementation Strategist")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            classNameConvert(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("HWBuilder", () => {
    test("0", () => {
        let callFunction = () => {
            HWBuilder(["SELECT * FROM %s;", "SELECT * FROM %s;", "INSERT INTO "])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            HWBuilder(["SELECT * FROM %s ORDER BY id ASC", "SELECT * FROM %s;", "DELETE FROM %s WHERE expires < %%s"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            HWBuilder(["SET IDENTITY_INSERT %s OFF", "SELECT COUNT(*) FROM ", "DELETE FROM %s WHERE cache_key = %%s"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            HWBuilder(["SET IDENTITY_INSERT %s OFF", "SET IDENTITY_INSERT %s OFF", "SELECT * FROM %s LIMIT 1;"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            HWBuilder(["DELETE FROM [", "INSERT INTO ", "DELETE FROM %s"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            HWBuilder(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("checkAvailability", () => {
    test("0", () => {
        let callFunction = () => {
            checkAvailability()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getABLMCC", () => {
    test("0", () => {
        let callFunction = () => {
            getABLMCC("Www.GooGle.com", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getABLMCC("http://www.example.com/route/123?foo=bar", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getABLMCC("http://base.com", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getABLMCC("https://", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getABLMCC("http://www.croplands.org/account/confirm?t=", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getABLMCC(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getABLMCCNotices", () => {
    test("0", () => {
        let callFunction = () => {
            getABLMCCNotices(18, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getABLMCCNotices(35, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getABLMCCNotices(25, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getABLMCCNotices(75, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getABLMCCNotices(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getABLMCCHW", () => {
    test("0", () => {
        let callFunction = () => {
            getABLMCCHW("Senior Brand Assistant", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getABLMCCHW("National Infrastructure Supervisor", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getABLMCCHW("Product Accountability Executive", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getABLMCCHW("Principal Implementation Strategist", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getABLMCCHW("Customer Metrics Consultant", () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getABLMCCHW(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
