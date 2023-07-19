export const PAYMENT_TYPE = [
    { value: "01", name: "Efectivo" },
    { value: "02", name: "Cheque nominativo" },
    { value: "03", name: "Transferencia electrónica de fondos" },
    { value: "04", name: "Tarjeta de crédito" },
    { value: "05", name: "Monedero electrónico" },
    { value: "06", name: "Dinero electrónico" },
    { value: "08", name: "Vales de despensa" },
    { value: "12", name: "Dación en pago" },
    { value: "13", name: "Pago por subrogación" },
    { value: "14", name: "Pago por consignación" },
    { value: "15", name: "Condonación" },
    { value: "17", name: "Compensación" },
    { value: "23", name: "Novación" },
    { value: "24", name: "Confusión" },
    { value: "25", name: "Remisión de deuda" },
    { value: "26", name: "Prescripción o caducidad" },
    { value: "27", name: "A satisfacción del acreedor" },
    { value: "28", name: "Tarjeta de débito" },
    { value: "29", name: "Tarjeta de servicios" },
    { value: "30", name: "Aplicación de anticipos" },
    { value: "31", name: "Intermediario pagos" },
    { value: "99", name: "Por definir" },
  ];

  export const PAYMENT_METHOD = [
    { value: "PUE", name: "Pago en una sola exhibición (de contado)" },
    { value: "PPD", name: "Pago en parcialidades o diferido (total o parcialmente a crédito). Requiere expedir un comprobante de pago cuando se reciba un pago subsecuente" },
  ];
  
  export const CFDI_USER = [
    { value: "G01", name: "Adquisición de mercancías" },
    { value: "G02", name: "Devoluciones, descuentos o bonificaciones" },
    { value: "G03", name: "Gastos en general" },
    { value: "I01", name: "Construcciones" },
    { value: "I02", name: "Mobiliario y equipo de oficina por inversiones" },
    { value: "I03", name: "Equipo de transporte" },
    { value: "I04", name: "Equipo de computo y accesorios" },
    { value: "I05", name: "Dados, troqueles, moldes, matrices y herramental" },
    { value: "I06", name: "Comunicaciones telefónicas" },
    { value: "I07", name: "Comunicaciones satelitales" },
    { value: "I08", name: "Otra maquinaria y equipo" },
    { value: "D01", name: "Honorarios médicos, dentales y gastos hospitalarios" },
    { value: "D02", name: "Gastos médicos por incapacidad o discapacidad" },
    { value: "D03", name: "Gastos funerales" },
    { value: "D04", name: "Donativos" },
    { value: "D05", name: "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)" },
    { value: "D06", name: "Aportaciones voluntarias al SAR" },
    { value: "D07", name: "Primas por seguros de gastos médicos" },
    { value: "D08", name: "Gastos de transportación escolar obligatoria" },
    { value: "D09", name: "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones" },
    { value: "D10", name: "Pagos por servicios educativos (colegiaturas)" },
    { value: "S01", name: "Sin efectos fiscales" },
    { value: "CP01", name: "Pagos" },
    { value: "CN01", name: "Nómina" },
  ];
  
export const INVOICE_RELATION =  [
    { value: "01", name: "Nota de crédito de los documentos relacionados" },
    { value: "02", name: "Nota de débito de los documentos relacionados" },
    { value: "03", name: "Devolución de mercancía sobre facturas o traslados previos" },
    { value: "04", name: "Sustitución de los CFDI previos" },
    { value: "05", name: "Traslados de mercancías facturados previamente" },
    { value: "06", name: "Factura generada por los traslados previos" },
    { value: "07", name: "CFDI por aplicación de anticipo" },
    { value: "08", name: "Factura generada por pagos en parcialidades" },
    { value: "09", name: "Factura generada por pagos diferidos" },
  ];

export const TAX_REGIME = [
    { value: "601", name: "General de Ley Personas Morales" },
    { value: "603", name: "Personas Morales con Fines no Lucrativos" },
    { value: "605", name: "Sueldos y Salarios e Ingresos Asimilados a Salarios" },
    { value: "606", name: "Arrendamiento" },
    { value: "608", name: "Demás ingresos" },
    // { value: "609", name: "Consolidación" },
    { value: "610", name: "Residentes en el Extranjero sin Establecimiento Permanente en México" },
    { value: "611", name: "Ingresos por Dividendos (socios y accionistas)" },
    { value: "612", name: "Personas Físicas con Actividades Empresariales y Profesionales" },
    { value: "614", name: "Ingresos por intereses" },
    { value: "616", name: "Sin obligaciones fiscales" },
    { value: "620", name: "Sociedades Cooperativas de Producción que optan por diferir sus ingresos" },
    { value: "621", name: "Incorporación Fiscal" },
    { value: "622", name: "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras" },
    { value: "623", name: "Opcional para Grupos de Sociedades" },
    { value: "624", name: "Coordinados" },
    { value: "628", name: "Hidrocarburos" },
    { value: "607", name: "Régimen de Enajenación o Adquisición de Bienes" },
    { value: "629", name: "De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales" },
    { value: "630", name: "Enajenación de acciones en bolsa de valores" },
    { value: "615", name: "Régimen de los ingresos por obtención de premios" },
    { value: "625", name: "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas" },
    { value: "626", name: "Régimen Simplificado de Confianza" },
  ];
  
  export const MONTHS =  [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ];
  
  
export const BIMESTERS = [
    { value: "13", name: "Enero-Febrero" },
    { value: "14", name: "Marzo-Abril" },
    { value: "15", name: "Mayo-Junio" },
    { value: "16", name: "Julio-Agosto" },
    { value: "17", name: "Septiembre-Octubre" },
    { value: "18", name: "Noviembre-Diciembre" },
]  

export const CONTRACT_TYPE = [
    { value: "01", name: "Contrato de trabajo por tiempo indeterminado" },
    { value: "02", name: "Contrato de trabajo para obra determinada" },
    { value: "03", name: "Contrato de trabajo por tiempo determinado" },
    { value: "04", name: "Contrato de trabajo por temporada" },
    { value: "05", name: "Contrato de trabajo sujeto a prueba" },
    { value: "06", name: "Contrato de trabajo con capacitación inicial" },
    { value: "07", name: "Modalidad de contratación por pago de hora laborada" },
    { value: "08", name: "Modalidad de trabajo por comisión laboral" },
    { value: "09", name: "Modalidades de contratación donde no existe relación de trabajo" },
    { value: "10", name: "Jubilación, pensión, retiro" },
    { value: "99", name: "Otro contrato" },
  ];

  export const JOURNEY_TYPE = [
    { value: "01", name: "Diurna" },
    { value: "02", name: "Nocturna" },
    { value: "03", name: "Mixta" },
    { value: "04", name: "Por hora" },
    { value: "05", name: "Reducida" },
    { value: "06", name: "Continuada" },
    { value: "07", name: "Partida" },
    { value: "08", name: "Por turnos" },
    { value: "99", name: "Otra Jornada" },
  ];

  export const TAX_REGIMES = [
    { value: "02", name: "Sueldos (Incluye ingresos señalados en la fracción I del artículo 94 de LISR)" },
  { value: "03", name: "Jubilados" },
  { value: "04", name: "Pensionados" },
  { value: "05", name: "Asimilados Miembros Sociedades Cooperativas Produccion" },
  { value: "06", name: "Asimilados Integrantes Sociedades Asociaciones Civiles" },
  { value: "07", name: "Asimilados Miembros consejos" },
  { value: "08", name: "Asimilados comisionistas" },
  { value: "09", name: "Asimilados Honorarios" },
  { value: "10", name: "Asimilados acciones" },
  { value: "11", name: "Asimilados otros" },
  { value: "12", name: "Jubilados o Pensionados" },
  { value: "13", name: "Indemnización o Separación" },
  { value: "99", name: "Otro Regimen" },
  ]

  export const RISK_TYPES = [
    { value: "1", name: "Clase I" },
    { value: "2", name: "Clase II" },
    { value: "3", name: "Clase III" },
    { value: "4", name: "Clase IV" },
    { value: "5", name: "Clase V" },
    { value: "99", name: "No aplica" },
  ]
  
  export const PAYMENT_PERIODICITY = [
    { value: "01", name: "Diario" },
    { value: "02", name: "Semanal" },
    { value: "03", name: "Catorcenal" },
    { value: "04", name: "Quincenal" },
    { value: "05", name: "Mensual" },
    { value: "06", name: "Bimestral" },
    { value: "07", name: "Unidad obra" },
    { value: "08", name: "Comisión" },
    { value: "09", name: "Precio alzado" },
    { value: "10", name: "Decenal" },
    { value: "99", name: "Otra Periodicidad" },
  ];

  export const INCOME_TYPES = [
    { value: "001", name: "Sueldos, Salarios Rayas y Jornales" },
    { value: "002", name: "Gratificación Anual (Aguinaldo)" },
    { value: "003", name: "Participación de los Trabajadores en las Utilidades PTU" },
    { value: "004", name: "Reembolso de Gastos Médicos Dentales y Hospitalarios" },
    { value: "005", name: "Fondo de Ahorro" },
    { value: "006", name: "Caja de ahorro" },
    { value: "009", name: "Contribuciones a Cargo del Trabajador Pagadas por el Patrón" },
    { value: "010", name: "Premios por puntualidad" },
    { value: "011", name: "Prima de Seguro de vida" },
    { value: "012", name: "Seguro de Gastos Médicos Mayores" },
    { value: "013", name: "Cuotas Sindicales Pagadas por el Patrón" },
    { value: "014", name: "Subsidios por incapacidad" },
    { value: "015", name: "Becas para trabajadores y/o hijos" },
    { value: "019", name: "Horas extra" },
    { value: "020", name: "Prima dominical" },
    { value: "021", name: "Prima vacacional" },
    { value: "022", name: "Prima por antigüedad" },
    { value: "023", name: "Pagos por separación" },
    { value: "024", name: "Seguro de retiro" },
    { value: "025", name: "Indemnizaciones" },
    { value: "026", name: "Reembolso por funeral" },
    { value: "027", name: "Cuotas de seguridad social pagadas por el patrón" },
    { value: "028", name: "Comisiones" },
    { value: "029", name: "Vales de despensa" },
    { value: "030", name: "Vales de restaurante" },
    { value: "031", name: "Vales de gasolina" },
    { value: "032", name: "Vales de ropa" },
    { value: "033", name: "Ayuda para renta" },
    { value: "034", name: "Ayuda para artículos escolares" },
    { value: "035", name: "Ayuda para anteojos" },
    { value: "036", name: "Ayuda para transporte" },
    { value: "037", name: "Ayuda para gastos de funeral" },
    { value: "038", name: "Otros ingresos por salarios" },
    { value: "039", name: "Jubilaciones, pensiones o haberes de retiro" },
    { value: "044", name: "Jubilaciones, pensiones o haberes de retiro en parcialidades" },
    { value: "045", name: "Ingresos en acciones o títulos valor que representan bienes" },
    { value: "046", name: "Ingresos asimilados a salarios" },
    { value: "047", name: "Alimentación diferentes a los establecidos en el Art 94 último párrafo LISR" },
    { value: "048", name: "Habitación" },
    { value: "049", name: "Premios por asistencia" },
    { value: "050", name: "Viáticos" },
    { value: "051", name: "Pagos por gratificaciones, primas, compensaciones, recompensas u otros en parcialidades" },
    { value: "052", name: "Pagos por jubilación en parcialidades derivados de una resolución judicial" },
    { value: "053", name: "Pagos por jubilación en una sola exhibición derivados de la ejecución de una resolución judicial" },
  ];

  export const HOURLY_TYPES = [
    { value: "01", name: "Dobles" },
    { value: "02", name: "Triples" },
    { value: "03", name: "Simples" },
  ];

  export const TAX_ADJUSTMENTS = [
    { value: "001", name: "Seguridad social" },
    { value: "002", name: "ISR" },
    { value: "003", name: "Aportaciones a retiro, cesantía en edad avanzada y vejez." },
    { value: "004", name: "Otros" },
    { value: "005", name: "Aportaciones a Fondo de vivienda" },
    { value: "006", name: "Descuento por incapacidad" },
    { value: "007", name: "Pensión alimenticia" },
    { value: "008", name: "Renta" },
    { value: "009", name: "Préstamos provenientes del Fondo Nacional de la Vivienda para los Trabajadores" },
    { value: "010", name: "Pago por crédito de vivienda" },
    { value: "011", name: "Pago de abonos INFONACOT" },
    { value: "012", name: "Anticipo de salarios" },
    { value: "013", name: "Pagos hechos con exceso al trabajador" },
    { value: "014", name: "Errores" },
    { value: "015", name: "Pérdidas" },
    { value: "016", name: "Averías" },
    { value: "017", name: "Adquisición de artículos producidos por la empresa o establecimiento" },
    { value: "018", name: "Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro" },
    { value: "019", name: "Cuotas sindicales" },
    { value: "020", name: "Ausencia (Ausentismo)" },
    { value: "021", name: "Cuotas obrero patronales" },
    { value: "022", name: "Impuestos Locales" },
    { value: "023", name: "Aportaciones voluntarias" },
    { value: "024", name: "Ajuste en Gratificación Anual (Aguinaldo) Exento" },
    { value: "025", name: "Ajuste en Gratificación Anual (Aguinaldo) Gravado" },
    { value: "026", name: "Ajuste en Participación de los Trabajadores en las Utilidades PTU Exento" },
    { value: "027", name: "Ajuste en Participación de los Trabajadores en las Utilidades PTU Gravado" },
    { value: "028", name: "Ajuste en Reembolso de Gastos Médicos Dentales y Hospitalarios Exento" },
    { value: "029", name: "Ajuste en Fondo de ahorro Exento" },
    { value: "030", name: "Ajuste en Caja de ahorro Exento" },
    { value: "031", name: "Ajuste en Contribuciones a Cargo del Trabajador Pagadas por el Patrón Exento" },
    { value: "032", name: "Ajuste en Premios por puntualidad Gravado" },
    { value: "033", name: "Ajuste en Prima de Seguro de vida Exento" },
    { value: "034", name: "Ajuste en Seguro de Gastos Médicos Mayores Exento" },
    { value: "035", name: "Ajuste en Cuotas Sindicales Pagadas por el Patrón Exento" },
    { value: "036", name: "Ajuste en Subsidios por incapacidad Exento" },
    { value: "037", name: "Ajuste en Becas para trabajadores y/o hijos Exento" },
    { value: "038", name: "Ajuste en Horas extra Exento" },
    { value: "039", name: "Ajuste en Horas extra Gravado" },
    { value: "040", name: "Ajuste en Prima dominical Exento" },
    { value: "041", name: "Ajuste en Prima dominical Gravado" },
    { value: "042", name: "Ajuste en Prima vacacional Exento" },
    { value: "043", name: "Ajuste en Prima vacacional Gravado" },
    { value: "044", name: "Ajuste en Prima por antigüedad Exento" },
    { value: "045", name: "Ajuste en Prima por antigüedad Gravado" },
    { value: "046", name: "Ajuste en Pagos por separación Exento" },
    { value: "047", name: "Ajuste en Pagos por separación Gravado" },
    { value: "048", name: "Ajuste en Seguro de retiro Exento" },
    { value: "049", name: "Ajuste en Indemnizaciones Exento" },
    { value: "050", name: "Ajuste en Indemnizaciones Gravado" },
    { value: "051", name: "Ajuste en Reembolso por funeral Exento" },
    { value: "052", name: "Ajuste en Cuotas de seguridad social pagadas por el patrón Exento" },
    { value: "053", name: "Ajuste en Comisiones Gravado" },
    { value: "054", name: "Ajuste en Vales de despensa Exento" },
    { value: "055", name: "Ajuste en Vales de restaurante Exento" },
    { value: "056", name: "Ajuste en Vales de gasolina Exento" },
    { value: "057", name: "Ajuste en Vales de ropa Exento" },
    { value: "058", name: "Ajuste en Ayuda para renta Exento" },
    { value: "059", name: "Ajuste en Ayuda para artículos escolares Exento" },
    { value: "060", name: "Ajuste en Ayuda para anteojos Exento" },
    { value: "061", name: "Ajuste en Ayuda para transporte Exento" },
    { value: "062", name: "Ajuste en Ayuda para gastos de funeral Exento" },
    { value: "063", name: "Ajuste en Otros ingresos por salarios Exento" },
    { value: "064", name: "Ajuste en Otros ingresos por salarios Gravado" },
    { value: "065", name: "Ajuste en Jubilaciones, pensiones o haberes de retiro en una sola exhibición Exento" },
    { value: "066", name: "Ajuste en Jubilaciones, pensiones o haberes de retiro en una sola exhibición Gravado" },
    { value: "067", name: "Ajuste en Pagos por separación Acumulable" },
    { value: "068", name: "Ajuste en Pagos por separación No acumulable" },
    { value: "069", name: "Ajuste en Jubilaciones, pensiones o haberes de retiro en parcialidades Exento" },
    { value: "070", name: "Ajuste en Jubilaciones, pensiones o haberes de retiro en parcialidades Gravado" },
    { value: "071", name: "Ajuste en Subsidio para el empleo (efectivamente entregado al trabajador)" },
    { value: "072", name: "Ajuste en Ingresos en acciones o títulos valor que representan bienes Exento" },
    { value: "073", name: "Ajuste en Ingresos en acciones o títulos valor que representan bienes Gravado" },
    { value: "074", name: "Ajuste en Alimentación Exento" },
    { value: "075", name: "Ajuste en Alimentación Gravado" },
    { value: "076", name: "Ajuste en Habitación Exento" },
    { value: "077", name: "Ajuste en Habitación Gravado" },
    { value: "078", name: "Ajuste en Premios por asistencia" },
    { value: "079", name: "Ajuste en Pagos distintos a los listados" },
    { value: "080", name: "Ajuste en Viáticos gravados" },
    { value: "081", name: "Ajuste en Viáticos (entregados al trabajador)" },
    { value: "082", name: "Ajuste en Fondo de ahorro Gravado" },
    { value: "083", name: "Ajuste en Caja de ahorro Gravado" },
    { value: "084", name: "Ajuste en Prima de Seguro de vida Gravado" },
    { value: "085", name: "Ajuste en Seguro de Gastos Médicos Mayores Gravado" },
    { value: "086", name: "Ajuste en Subsidios por incapacidad Gravado" },
    { value: "087", name: "Ajuste en Becas para trabajadores y/o hijos Gravado" },
    { value: "088", name: "Ajuste en Seguro de retiro Gravado" },
    { value: "089", name: "Ajuste en Vales de despensa Gravado" },
    { value: "090", name: "Ajuste en Vales de restaurante Gravado"},
    { value: "091", name: "Ajuste en Vales de gasolina Gravado" },
    { value: "092", name: "Ajuste en Vales de ropa Gravado" },
    { value: "093", name: "Ajuste en Ayuda para renta Gravado" },
    { value: "094", name: "Ajuste en Ayuda para artículos escolares Gravado" },
    { value: "095", name: "Ajuste en Ayuda para anteojos Gravado" },
    { value: "096", name: "Ajuste en Ayuda para transporte Gravado" },
    { value: "097", name: "Ajuste en Ayuda para gastos de funeral Gravado" },
    { value: "098", name: "Ajuste a ingresos asimilados a salarios gravados" },
    { value: "099", name: "Ajuste a ingresos por sueldos y salarios gravados" },
    { value: "100", name: "Ajuste en Viáticos exentos" },
    { value: "101", name: "ISR Retenido de ejercicio anterior" },
    { value: "102", name: "Ajuste a pagos por gratificaciones, primas, compensaciones, recompensas u otros" },
    { value: "103", name: "Ajuste a pagos en parcialidades derivados de una resolución judicial gravados" },
    { value: "104", name: "Ajuste a pagos en parcialidades derivados de una resolución judicial exentos" },
    { value: "105", name: "Ajuste a pagos en una sola exhibición derivados de una resolución judicial gravados" },
    { value: "106", name: "Ajuste a pagos en una sola exhibición derivados de una resolución judicial exentos" },
    { value: "107", name: "Ajuste al Subsidio Causado" }
  ]
  
  export const OTHER_PAYMENTS = [
    { value: "001", name: "Reintegro de ISR pagado en exceso." },
    { value: "002", name: "Subsidio para el empleo (efectivamente entregado al trabajador)." },
    { value: "003", name: "Viáticos (entregados al trabajador)." },
    { value: "004", name: "Aplicación de saldo a favor por compensación anual." },
    { value: "005", name: "Reintegro de ISR retenido en exceso de ejercicio anterior" },
    { value: "006", name: "Alimentos en bienes (Servicios de comedor y comida)." },
    { value: "007", name: "ISR ajustado por subsidio." },
    { value: "008", name: "Subsidio efectivamente entregado que no correspondía." },
    { value: "009", name: "Reembolso de descuentos efectuados para el crédito de vivienda." },
    { value: "999", name: "Pagos distintos a los listados." }
  ]
  
  export const ABSENCE_TYPE = [
    { value: "01", name: "Riesgo de trabajo." },
    { value: "02", name: "Enfermedad en general." },
    { value: "03", name: "Maternidad." },
    { value: "04", name: "Licencia por cuidados médicos de hijos diagnosticados con cáncer." }
  ]

  export const RETENTION_TYPES = [
    { value: "01", name: "Servicios profesionales." },
    { value: "02", name: "Regalías por derechos de autor." },
    { value: "03", name: "Autotransporte terrestre de carga." },
    { value: "04", name: "Servicios prestados por comisionistas." },
    { value: "05", name: "Arrendamiento." },
    { value: "06", name: "Enajenación de acciones." },
    { value: "07", name: "Enajenación de bienes objeto de la LIEPS, a través de mediadores, agentes, representantes, corredores, consignatarios o distribuidores." },
    { value: "08", name: "Enajenación de bienes inmuebles consignada en escritura pública." },
    { value: "09", name: "Enajenación de otros bienes, no consignada en escritura pública." },
    { value: "10", name: "Adquisición de desperdicios industriales." },
    { value: "11", name: "Adquisición de bienes consignada en escritura pública." },
    { value: "12", name: "Adquisición de otros bienes, no consignada en escritura pública." },
    { value: "13", name: "Otros retiros de AFORE." },
    { value: "14", name: "Dividendos o utilidades distribuidas." },
    { value: "15", name: "Remanente distribuible." },
    { value: "16", name: "Intereses." },
    { value: "17", name: "Arrendamiento en fideicomiso." },
    { value: "18", name: "Pagos realizados a favor de residentes en el extranjero." },
    { value: "19", name: "Enajenación de acciones u operaciones en bolsa de valores." },
    { value: "20", name: "Obtención de premios." },
    { value: "21", name: "Fideicomisos que no realizan actividades empresariales." },
    { value: "22", name: "Planes personales de retiro." },
    { value: "23", name: "Intereses reales deducibles por créditos hipotecarios." },
    { value: "24", name: "Operaciones Financieras Derivadas de Capital." },
    { value: "25", name: "Otro tipo de retenciones." },
    { value: "26", name: "Servicios mediante Plataformas Tecnológicas" }
  ]
  
  
  
  