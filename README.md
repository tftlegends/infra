# TFT Legends

## Overview
TFT Legends is an advanced chatbot tool for Teamfight Tactics players, available on the ChatGPT Store. It delivers strategic composition suggestions to enhance gameplay.

## System Architecture

### Overview

![image](https://github.com/tftlegends/infra/assets/75265893/df740c3c-dd46-454d-bf95-e7bd830c4892)


### Data Storage and Management
- **Vector Database**: Uses pgvector and PostgreSQL, hosted on AWS RDS.

### Bot Message Handler
- **Deployment**: AWS Lambda with SQS queue integration.
- **Function**: Connects with a Telegram bot for DevOps events and daily match scraping reports.

### Match Scraper
- **Operation**: Triggered every 15 minutes, adding about 2000 TFT matches daily.
- **Trigger Mechanism**: CloudWatch events or event queue with a username.

### API Server
- **Integration**: Connected with Vector DB.
- **Function**: Provides essential data to the chatbot.

### Daily Notifier
- **Function**: Generates daily reports on match additions to DB and other analytics like average match insertion time.

## Features
- **Real-Time Suggestions**: Offers composition advice based on current game state.
- **Data-Driven Insights**: Utilizes latest meta and statistical analysis.
- **User-Friendly Interface**: Easy to interact, efficient response time.

## Installation
Get TFT Legends from the ChatGPT Store:
[ChatGPT Store - TFT Legends](https://chat.openai.com/g/g-9dABtRYhg-blitzcore)

## Usage
- Launch the chatbot from the ChatGPT Store.
- Enter your current game state.
- Receive instant comp suggestions.

## Support
For issues and queries, open an issue on the repository or contact support@example.com.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contributions
Contributions are welcome. Please fork the repository and create a pull request with your features or fixes.

---

TFT Legends - Master Your Game.
