import { React, useEffect, useState } from 'react'
import './App.css'
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { LIMIT, SUMMARIZATION_LENGTHS } from './constants'
import { apiSimulatedPost } from './simulatedApi.services'

function App () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [summarization, setSummarization] = useState('')
  const [summarizationLength, setSummarizationLength] = useState('')
  const [result, setResult] = useState({
    originalText: '',
    summarizedText: '',
    summarizedLength: '',
    confidenceScore: ''
  })
  const handleChange = text => {
    setSummarization(text)
  }
  const handleSubmit = () => {
    const body = JSON.stringify({ summarization, summarizationLength })
    apiSimulatedPost('https://someSimulatedAPIEndpoint', { body }).then(dataResult => {
      setLoading(true)
      setResult((prevResult) => (dataResult))
    }).catch(error => {
      // Error Handling
      setError(true)
      setErrorMessage(error.response)
      console.log(JSON.stringify(error))
    })
  }
  const handleRadioGroupChange = (value) => {
    setSummarizationLength(value)
  }
  const handleClose = () => {
    setError(false)
  }
  useEffect(() => {
    setLoading(false)
  }, [result])

  if (loading) return <p>Loading...</p>

  return (
    <>
    <Container maxWidth="sm">
      <Modal
        open={error}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box>
      {errorMessage}
        </Box>
      </Modal>

      <Box>
      <TextField
          id="outlined-multiline-flexible"
          label="Summarization"
          multiline
          maxRows={4}
          helperText={`${summarization.length}/${LIMIT}`}
          onChange={(event) => handleRadioGroupChange(event.target.value)}
          inputProps={{
            maxLength: LIMIT
          }}
        />
        </Box>
        <Box>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="short"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          {
          Object.values(SUMMARIZATION_LENGTHS).map((lenght) => (
          <FormControlLabel value={lenght} control={<Radio />} label={lenght} key={lenght}/>
          )
          )}

        </RadioGroup>
        </Box>
        <Box>
        <Button variant="contained" onClick={handleSubmit}>Send</Button>
        </Box>
    </Container>

    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card>
        <CardHeader title='Results'/>
      <CardContent variant="outlined" sx={{ maxWidth: 360, textAlign: 'left' }} >
        <Box>
        <Typography variant="h5" gutterBottom>
          Original: {result.originalText}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Copy:{result.summarizedText}
          </Typography>
          <Divider />
          <Typography variant="h6" gutterBottom>
          Summarized Length: {result.summarizedLength}
          </Typography>
          <Typography variant="h6" gutterBottom>
          Confidence Score: {result.confidenceScore}
          </Typography>
        </Box>
      </CardContent >
      </Card>
    </Container>

    </>
  )
}

export default App
