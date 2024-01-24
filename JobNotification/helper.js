const getWebViewScript = () => {
    return `
    let search = document.getElementsByClassName('accordion-toggle collapsed');
    search[0].click();
    let country = document.getElementById('j_id0:portId:j_id67:Country');
    let state = document.getElementById('j_id0:portId:j_id67:State');
    country.value = 'CA';
    state.value = 'ON';
    let submit = document.getElementById('j_id0:portId:j_id67:filter-jobs');
    submit.click();
  `;
  };

  const getSearchScript = (searchText) => {
    return `
    const elements = Array.from(document.querySelectorAll('*')).filter(element => element.textContent.includes('${searchText}'));
    if (elements.length > 0) {
      // Job found
      window.ReactNativeWebView.postMessage('Job Found');
    } else {
      // Job not found
      window.ReactNativeWebView.postMessage('No Job Found');
    }
  `;
  };
  

  const Script = {
    getWebViewScript,
    getSearchScript

  }

  export default Script