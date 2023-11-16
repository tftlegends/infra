
const sentences = [
	"Hazır ol, büyük bir şov başlıyor!",
	"Bu olayın tadını çıkarın, çünkü bu çok komik!",
	"Bir mucize mi oluyor? Haydi, bu eğlenceli!",
	"Vay canına, bu gerçekten harika!",
	"Beklemeye değerdi, bu şimdiye kadarki en iyi şey!",
	"Heyecan dorukta! Bu çok eğlenceli olacak!",
	"Olaylar çığırından çıkıyor, hazır olun!",
	"Daha fazla heyecan, daha fazla eğlence!",
	"Bu şaka harika! (Üstelik gerçek!)",
	"Şu ana kadar gördüğüm en komik şey!",
	"Bu bir peri masalı gibi! (Ama daha komik)",
	"Kendinizi gülmekten alıkoyamayacaksınız!",
	"Gerçekten, gerçekten komik!",
	"Bu olayla sıkı tutun, harika bir şey olacak!",
	"Çılgın bir macera başlıyor!",
	"Eğlence tavan yapacak!",
	"Bu kadar eğlenceli olması yasaklanmalı!",
	"Düşününce bile kahkaha atacağım!",
	"Şimdiye kadar gördüğüm en eğlenceli şey!",
	"Sadece izlemekle yetinmeyin, katılın!",
	"Hala izlemiyorsanız, bu gerçekten kaçırıyorsunuz!",
	"Ufak bir sır: Bu şaka inanılmaz!",
	"Kahkahalarla dolu bir etkinlik!",
	"Sadece bir kelime: Şahane!",
	"Olamaz, bu ne kadar komik!",
	"Bu kadar eğlence nasıl bu kadar komik olabilir?",
	"Eğlenceyi ikiye katlayan bir şaka!",
	"Gerçekten şaşırtıcı ve komik!",
	"Bunu gördüğünüzde şaşıracaksınız!",
	"Bu eğlence dalgasına katılın!",
	"Şaka şimdiye kadarki en iyisi!",
	"Bu kadar gülmek sizi zinde tutar!",
	"Bu kadar eğlenceyi kim beklerdi?",
	"Heyecanı yakalayın, bu inanılmaz!",
	"Bu sadece başlangıç, daha fazlası geliyor!",
	"Sürprizlerle dolu bir eğlence şöleni!",
	"Eğlenceye hoş geldiniz!",
	"Bu şaka ödülleri hak ediyor!",
	"Hala izlemiyorsanız, hemen başlayın!",
	"Bu kadar güzel bir eğlenceyi nasıl kaçırırsınız?",
	"Sadece izlemeyin, katılın ve eğlenin!",
	"Eğlence yüksek sesle gülmekle başlar!",
	"Bu bir güldürü bombası!",
	"Komedi şöleni başlıyor!",
	"Kahkaha garantili!",
	"Bunu gördüğünüzde kahkahalarla güleceksiniz!",
	"Bu kadar eğlenceyi kaçırmamak için ne yapmalı?",
	"Gerçekten komik bir sürpriz!",
	"Bu şaka kesinlikle harika!",
	"Sizi güldürmek için buradayız!",
	"Eğlence radyasyonu yayıyor!",
	"Bu kadar güzel bir şaka, kaçmaz!",
];



class SpecialEventLogic {


	static filterSpecialEvent(matchId,units) {

		for(const unit of units) {
			if(unit.rarity === 6 && unit.tier === 3) {
				const randomSentence1 = sentences[Math.floor(Math.random() * sentences.length)];
				const randomSentence2 = sentences[Math.floor(Math.random() * sentences.length)];
				const unitName = unit.character_id.replace("TFT9_","");
				console.log('Match IDsi: ' + matchId);
				console.log(`${randomSentence1} ${unitName} 3 ${randomSentence2}!`);
			}

		}
	}
}

module.exports = SpecialEventLogic;
