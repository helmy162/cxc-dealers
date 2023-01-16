import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function CarPDF({ car }) {
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const rows = [
            ['Make', car.make], 
            ['Model', car.model],
            ['Trim', car.trim],
            ['Year', car.year],
            ['Odometer Reading (in KILOMETERS)', car.odometerReading],
            ['Registered Emirates', car.registeredEmirates],
            ['Engine CC', car.engineCC],
            ['Engine no. of cylinders', car.engineCylinder],
            ['Horsepower (in BHP)', car.horsepower]
        ];
        const itemsPerRow = 4;
        let rowIndex = 0;
        let currentRow = [];
        let cells = [];
        for (let i = 0; i < rows.length; i++) {
            currentRow.push([rows[i][0],rows[i][1]]);
            rowIndex++;
            if (rowIndex === itemsPerRow || i === rows.length - 1) {
                doc.autoTable({
                  startY: 20,
                  head: [],
                  body: currentRow,
                  columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } },
                  styles: { fontSize: 12 },
                  theme: 'grid',
                  didDrawCell: function(data) {
                    if (data.section === 'body' && data.column.index === 0) {
                      data.cell.styles.fontStyle = 'bold';
                    }
                  },
                  willDrawCell: function(data) {
                    if (data.section === 'body' && data.column.index === 1) {
                      data.cell.styles.fontStyle = 'normal';
                    }
                    if (data.section === 'body') {
                      cells.push(data.cell);
                    }
                  },
                  didDrawPage: function(data) {
                    for (let i = 0; i < cells.length; i+=4) {
                        if(cells[i] && cells[i].row)
                            doc.autoTable.mergeCells(cells[i].row.index, cells[i].column.index, 1, 2);
                        if(cells[i+1] && cells[i+1].row)
                            doc.autoTable.mergeCells(cells[i+1].row.index, cells[i+1].column.index, 1, 2);
                        if(cells[i+2] && cells[i+2].row)
                            doc.autoTable.mergeCells(cells[i+2].row.index, cells[i+2].column.index, 1, 2);
                        if(cells[i+3] && cells[i+3].row)
                            doc.autoTable.mergeCells(cells[i+3].row.index, cells[i+3].column.index, 1, 2);
                    }
                
                  },
                });
                doc.save(`${car.make}_${car.model}.pdf`);
                currentRow = [];
                rowIndex = 0;
                cells = [];
            }
        }
      }

  return (
    <>
      <div>
        <h1>{car.make} {car.model}</h1>
        <p>Year: {car.year}</p>
        <p>Price: {car.year}</p>
      </div>
      <button onClick={handleDownloadPdf}>Download PDF</button>
    </>
  );
}
