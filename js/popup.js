'use strict';

(() => {

  function handleFileSelect(event) {
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer.files;
    for (let i = 0, len = files.length; i < len; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (file => {
        return event => {
          const content = new Content(event.target.result);
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${content.getMd5sum()}</td>
            <td>${content.getMd5sumLf()}</td>
            <td>${content.getEncoding()}</td>
            <td>${content.getLineFeedCode()}</td>
            <td>${file.name}</td>`;
          return document.getElementById('list').insertBefore(tr, null);
        };
      })(file);
    }
  }

  function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('drop', handleFileSelect);
  dropZone.addEventListener('dragover', handleDragOver);

})();
