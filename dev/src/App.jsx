import { useState, useEffect } from 'react'

function App() {
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [imc, setImc] = useState(null)
  const [classificacao, setClassificacao] = useState('')

  const formatarDecimal = (valor) => {
    // Remove tudo que não é dígito
    const apenasNumeros = valor.replace(/\D/g, '')
    if (!apenasNumeros) return ''
    
    // Converte para número e divide por 100
    const numero = (parseInt(apenasNumeros) / 100).toFixed(2)
    
    // Retorna formatado com vírgula para exibição
    return numero.replace('.', ',')
  }

  const handleAlturaChange = (e) => {
    setAltura(formatarDecimal(e.target.value))
  }

  const handlePesoChange = (e) => {
    setPeso(formatarDecimal(e.target.value))
  }

  useEffect(() => {
    if (altura && peso) {
      const h = parseFloat(altura.replace(',', '.'))
      const p = parseFloat(peso.replace(',', '.'))
      
      if (h > 0 && p > 0) {
        const valorImc = (p / (h * h)).toFixed(2)
        setImc(valorImc)
        setClassificacao(getLinkClassificacao(valorImc))
      } else {
        setImc(null)
        setClassificacao('')
      }
    } else {
      setImc(null)
      setClassificacao('')
    }
  }, [altura, peso])

  const getLinkClassificacao = (valor) => {
    if (valor < 18.5) return 'Abaixo do peso'
    if (valor < 25) return 'Peso normal'
    if (valor < 30) return 'Sobrepeso'
    if (valor < 35) return 'Obesidade grau I'
    if (valor < 40) return 'Obesidade grau II'
    return 'Obesidade grau III'
  }

  return (
    <div className="container">
      <header>
        <h1>Calculadora de IMC</h1>
        <p>Insira seus dados para descobrir seu Índice de Massa Corporal.</p>
      </header>
      
      <main>
        <div className="card">
          <div className="form-group">
            <label htmlFor="altura">Altura (m)</label>
            <input 
              id="altura"
              type="text" 
              placeholder="Ex: 1,75" 
              value={altura}
              onChange={handleAlturaChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="peso">Peso (kg)</label>
            <input 
              id="peso"
              type="text" 
              placeholder="Ex: 70,00" 
              value={peso}
              onChange={handlePesoChange}
            />
          </div>

          {imc && (
            <div className="result-area animate-fade-in">
              <div className="imc-value">
                <span>Seu IMC:</span>
                <strong>{imc}</strong>
              </div>
              <div className="imc-status">
                <span>Classificação:</span>
                <strong className={classificacao.replace(/\s+/g, '-').toLowerCase()}>
                  {classificacao}
                </strong>
              </div>
            </div>
          )}
        </div>

        <section className="table-section">
          <h2>Tabela de Referência</h2>
          <table>
            <thead>
              <tr>
                <th>IMC</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classificacao === 'Abaixo do peso' ? 'active' : ''}>
                <td>Menor que 18,5</td>
                <td>Abaixo do peso</td>
              </tr>
              <tr className={classificacao === 'Peso normal' ? 'active' : ''}>
                <td>18,5 - 24,9</td>
                <td>Peso normal</td>
              </tr>
              <tr className={classificacao === 'Sobrepeso' ? 'active' : ''}>
                <td>25,0 - 29,9</td>
                <td>Sobrepeso</td>
              </tr>
              <tr className={classificacao === 'Obesidade grau I' ? 'active' : ''}>
                <td>30,0 - 34,9</td>
                <td>Obesidade grau I</td>
              </tr>
              <tr className={classificacao === 'Obesidade grau II' ? 'active' : ''}>
                <td>35,0 - 39,9</td>
                <td>Obesidade grau II</td>
              </tr>
              <tr className={classificacao === 'Obesidade grau III' ? 'active' : ''}>
                <td>Maior que 40,0</td>
                <td>Obesidade grau III</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>Projeto desenvolvido para o exercício EBAC.</p>
      </footer>
    </div>
  )
}

export default App
