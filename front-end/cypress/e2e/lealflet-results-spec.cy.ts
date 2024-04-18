describe('LeafletResults', () => {
  const medicineName = 'AMOXICILINA';
  const company = 'MULTILAB INDUSTRIA E COMERCIO DE PRODUTOS FARMACEUTICOS LTDA';

  beforeEach(() => {
    cy.intercept('GET', '/data*', { fixture: '/mocks/lealflet/get.json' });
  });

  it('should display medication information when searching by name', () => {
    cy.visit(`/bulario/name/${encodeURIComponent(medicineName.toUpperCase())}/company/%20/id/%20`);

    cy.get(".medicineName").should("contain", medicineName);
  });

  it('should allow the user to search for medication by company', () => {
    cy.visit(`/bulario/name/%20/company/${encodeURIComponent(company.toUpperCase())}/id/%20`);

    cy.get(".medicineCompany").should("contain", company);
  });

  it('should paginate results correctly', () => {
    const generatePageData = (pageNumber: number) => {
      const perPage = 10;
      const totalPages = 5;
      const totalItems = 50;
  
      const startIndex = (pageNumber - 1) * perPage;
      const endIndex = Math.min(startIndex + perPage, totalItems);
  
      const data = Array.from({ length: endIndex - startIndex }, () => ({
        id: "c3fadb4e-caa2-4774-aa9c-5a422b4034cf",
        name: "AMOXICILINA",
        published_at: "2022-07-27T15:49:38.000Z",
        company: "MULTILAB INDUSTRIA E COMERCIO DE PRODUTOS FARMACEUTICOS LTDA",
        documents: [
          {
            id: "9ca6798f-4c42-4505-b38c-0329778b38d4",
            expedient: "4458912224",
            type: "PROFESSIONAL",
            url: "http://localhost:3000/pdf_sample.pdf"
          },
          {
            id: "f6d9fa44-3533-4f72-b7e3-f5ed5a01e274",
            expedient: "4458912224",
            type: "PATIENT",
            url: "http://localhost:3000/pdf_sample.pdf"
          }
        ],
        active_principles: [
          {
            id: "52b6792f-0330-421f-b155-a27f418ffb4d",
            name: "TADALAFILA"
          }
        ]
      }));
  
      return {
        prev: pageNumber,
        next: pageNumber + 1,
        // last: pageNumber,
        pages: totalPages,
        items: totalItems,
        data,
      };
    };

    cy.visit(`/bulario/name/${encodeURIComponent(medicineName.toUpperCase())}/company/%20/id/%20`);

    cy.intercept('GET', '/data*', (req) => req.reply(generatePageData(1)));
    cy.get('.MedicineItem').should('have.length', 10);
    cy.contains('.PageButton.active', '1');

    cy.get('button.NextPage').click();
    cy.intercept('GET', '/data*', (req) => req.reply(generatePageData(2)));
    cy.get('.MedicineItem').should('have.length', 10);
    cy.contains('.PageButton.active', '2');

    cy.get('button.LastPage').click();
    cy.intercept('GET', '/data*', (req) => req.reply(generatePageData(1)));
    
    cy.get('.MedicineItem').should('have.length', 10);
    cy.contains('.PageButton.active', '1');

    cy.get('button.Back').click();
    cy.url().should('include', '/');
  });

  it(('Should correctly sort results'), () => {
    cy.visit(`/bulario/name/%20/company/%20/id/%20`);

    cy.get('select.OrderByContainer').select('name');
    cy.intercept({method: 'GET', url: '/data*'  }, { fixture: '/mocks/lealflet/get.json' }, (req) => {
      req.url.include('name')
    });

    cy.get('select.OrderByContainer').select('published_at');
    cy.intercept({method: 'GET', url: '/data*'  }, { fixture: '/mocks/lealflet/get.json' }, (req) => {
      req.url.include('published_at')
    });
  });
});