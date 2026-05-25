<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mechatronics Lesson Card</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      padding: 20px;
      color: #222;
    }

    .lesson-card {
      max-width: 850px;
      margin: auto;
      background: white;
      border-radius: 14px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      line-height: 1.7;
    }

    .lesson-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
      color: #0f172a;
    }

    h2 {
      margin-top: 28px;
      color: #1e3a8a;
      font-size: 1.3rem;
    }

    p {
      margin-top: 10px;
    }

    ul {
      margin-top: 10px;
      padding-left: 20px;
    }

    .formula {
      background: #eef2ff;
      border-left: 5px solid #2563eb;
      padding: 16px;
      margin: 20px 0;
      border-radius: 8px;
      font-size: 1.4rem;
      text-align: center;
      font-weight: bold;
    }

    .takeaway {
      background: #ecfeff;
      border-left: 5px solid #0891b2;
      padding: 18px;
      border-radius: 8px;
      margin-top: 25px;
    }

    .graphic-box {
      background: #f8fafc;
      border: 2px dashed #94a3b8;
      padding: 20px;
      margin-top: 25px;
      border-radius: 10px;
    }

    .graphic-title {
      font-weight: bold;
      margin-bottom: 10px;
      color: #334155;
    }

    @media (max-width: 600px) {
      .lesson-card {
        padding: 20px;
      }

      .lesson-title {
        font-size: 1.6rem;
      }

      .formula {
        font-size: 1.1rem;
      }
    }
  </style>
</head>
<body>

<div class="lesson-card">
  <div class="lesson-title">What Actually Is Electricity?</div>

  <h2>Understanding Electricity Simply</h2>
  <p>
    Electricity is the movement of tiny charged particles called electrons.
    These electrons already exist inside wires. When a battery is connected,
    it creates electrical pressure that pushes the electrons to move.
  </p>

  <p>
    Think of electricity like water flowing through pipes. The water is already
    inside the pipe, but pressure is needed to make it move.
  </p>

  <h2>Voltage — The Push</h2>
  <p>
    Voltage is the electrical pressure that pushes electrons through a wire.
    It is measured in volts (V).
  </p>

  <h2>Current — The Flow</h2>
  <p>
    Current is the flow of electrons through the circuit. It is measured in
    amperes (A), commonly called amps.
  </p>

  <ul>
    <li>Voltage = Pressure</li>
    <li>Current = Flow</li>
    <li>Resistance = Blockage</li>
  </ul>

  <h2>Resistance — The Blockade</h2>
  <p>
    Resistance slows down the movement of electrons. Thin wires and electrical
    components make it harder for current to flow.
  </p>

  <h2>Ohm's Law</h2>

  <div class="formula">
    V = I × R
  </div>

  <p>
    This equation connects voltage, current, and resistance.
  </p>

  <div class="takeaway">
    <strong>Key Takeaway:</strong><br>
    A battery does not “contain electricity.” It creates a pressure difference
    that pushes electrons through a complete circuit.
  </div>

  <div class="graphic-box">
    <div class="graphic-title">Supporting Graphic Suggestion</div>
    Show a side-by-side comparison of:
    <ul>
      <li>Water flowing through pipes</li>
      <li>A battery connected to a bulb with flowing current arrows</li>
      <li>A narrow pipe section labeled “Resistance”</li>
    </ul>
  </div>
</div>

</body>
</html>
