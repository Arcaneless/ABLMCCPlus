
export default class Logger {
  logWARN(msg) {
    console.log('WARN:\n' + msg);
  }

  logERROR(msg) {
    console.log('ERROR:\n' + msg);
  }

  logINFO(msg) {
    console.log('INFO:\n' + msg);
  }

  logging() {
    return new ABLMCCLogging();
  }
}

class ABLMCCLogging {
  //main frame render
  indexRender() {
    return 'Index render';
  }

  // subpage render
  normalNews() {
    return 'Normal News rendered successfuly'
  }

  notices() {
    return 'Notices rendered successfuly'
  }

  assignments() {
    return 'Assignments rendered successfuly'
  }

  about() {
    return 'About page rendered successfuly'
  }

  calendar() {
    return 'School Calendar rendered successfuly'
  }


}
