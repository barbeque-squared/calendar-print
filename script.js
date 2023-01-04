function pageload() {
  const year = Temporal.Now.plainDateISO().year;
  document.getElementById('year').value = Temporal.Now.plainDateISO().year;
  generateCalendar();
}

function generateCalendar() {
  const year = document.getElementById('year').value;
  const locale = document.getElementById('locale').value;
  
  const calendar = document.getElementById('calendar');
  // reset contents
  calendar.textContent = '';
  
  const addMonth = (month) => {
    const elem = document.createElement('div');
    elem.className = 'month';
    // title
    const title = document.createElement('div');
    title.className = 'title';
    const first = Temporal.PlainDate.from({year, month, day: 1});
    title.textContent = first.toLocaleString(locale, {month: 'long', year: 'numeric'})
    elem.appendChild(title);
    // table
    const table = document.createElement('table');
    // table -- header
    const trh = document.createElement('tr');
    const firstDayOfMonth = first.dayOfWeek
    for (let day = 9 - firstDayOfMonth; day < 16 - firstDayOfMonth; day++) {
      const th = document.createElement('th');
      th.textContent = Temporal.PlainDate.from({year, month, day}).toLocaleString(locale, {weekday: 'short'});
      trh.appendChild(th);
    }
    table.append(trh);
    // table -- rows
    let tr = document.createElement('tr');
    // add empty cells before the first
    for (let dayOfWeek = 1; dayOfWeek < firstDayOfMonth; dayOfWeek++) {
      const td = document.createElement('td');
      td.className = 'noborder';
      tr.appendChild(td);
    }
    // actual cells
    for (let day = 1; day <= first.daysInMonth; day++) {
      const td = document.createElement('td');
      td.textContent = day;
      tr.appendChild(td);
      const date = Temporal.PlainDate.from({year, month, day});
      if (date.dayOfWeek === 7 && day < first.daysInMonth) {
        // there will be at least one more row after this
        table.appendChild(tr);
        tr = document.createElement('tr');
      }
    }
    // add empty cells to the last row
    const last = Temporal.PlainDate.from({year, month, day: first.daysInMonth});
    for (let dayOfWeek = last.dayOfWeek; dayOfWeek < 7; dayOfWeek++) {
      const td = document.createElement('td');
      td.className = 'noborder';
      tr.appendChild(td);
    }
    // add the last remaining row
    table.appendChild(tr);
    // add it to the page
    elem.appendChild(table);
    calendar.appendChild(elem);
  }
  
  for (let month = 1; month <= 12; month++) {
    addMonth(month);
  }
  
  // update document title
  document.title = 'calendar-' + year + '-' + locale;
  
  // prevent default form submission
  return false;
}
