function inlineSvg() {
  const svg = document.querySelectorAll('img.svg');
  if (svg) {
    svg.forEach(function (element) {
      var imgID = element.id;
      var imgClass = element.className;
      var imgURL = element.src;

      fetch(imgURL)
        .then(response => response.text())
        .then(function (data) {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(data, 'image/svg+xml');
          var $svg = xmlDoc.getElementsByTagName('svg')[0];

          if (typeof imgID !== 'undefined' && imgID !== '') {
            $svg.setAttribute('id', imgID);
          }

          if (typeof imgClass !== 'undefined' && imgClass !== '') {
            $svg.setAttribute('class', imgClass + ' replaced-svg');
          }

          $svg.removeAttribute('xmlns:a');
          element.parentNode.replaceChild($svg, element);
        });
    });
  }
};
inlineSvg();
