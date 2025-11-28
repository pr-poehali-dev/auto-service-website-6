import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const services = [
    {
      icon: 'Wrench',
      title: 'Ремонт МКПП',
      description: 'Полная диагностика и ремонт механических коробок передач любой сложности',
      price: 'от 15 000 ₽'
    },
    {
      icon: 'Cog',
      title: 'Замена сцепления',
      description: 'Профессиональная замена комплекта сцепления с гарантией качества',
      price: 'от 8 000 ₽'
    },
    {
      icon: 'Settings',
      title: 'Регулировка МКПП',
      description: 'Настройка и регулировка механизмов переключения передач',
      price: 'от 3 000 ₽'
    },
    {
      icon: 'Droplet',
      title: 'Замена масла',
      description: 'Замена трансмиссионного масла с промывкой системы',
      price: 'от 2 500 ₽'
    },
    {
      icon: 'Shield',
      title: 'Диагностика',
      description: 'Комплексная диагностика состояния коробки передач',
      price: 'от 1 500 ₽'
    },
    {
      icon: 'Zap',
      title: 'Срочный ремонт',
      description: 'Экспресс-ремонт в течение 24 часов',
      price: 'от 20 000 ₽'
    }
  ];

  const features = [
    { icon: 'Award', title: 'Опыт 15+ лет', description: 'Работаем с МКПП всех марок автомобилей' },
    { icon: 'Clock', title: 'Быстрый сервис', description: 'Стандартный ремонт за 2-3 дня' },
    { icon: 'CheckCircle', title: 'Гарантия 12 месяцев', description: 'На все виды работ и запчасти' },
    { icon: 'Sparkles', title: 'Оригинальные запчасти', description: 'Сертифицированные комплектующие' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !service || !date || !selectedTime) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка принята!',
      description: `Мы свяжемся с вами по телефону ${phone} для подтверждения записи`
    });

    setName('');
    setPhone('');
    setService('');
    setComment('');
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Settings" size={32} className="text-primary" />
              <span className="text-2xl font-bold">МКПП Сервис</span>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="hidden md:flex">
                  Записаться на ремонт
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Онлайн-запись</DialogTitle>
                  <DialogDescription>
                    Выберите дату, время и услугу для записи на обслуживание
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service">Услуга</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.title} value={s.title}>
                            {s.title} — {s.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Дата</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Время</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий (необязательно)</Label>
                    <Textarea
                      id="comment"
                      placeholder="Опишите проблему или оставьте дополнительные пожелания"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Профессиональный ремонт МКПП
              </h1>
              <p className="text-xl text-muted-foreground">
                Качественное обслуживание механических коробок передач с гарантией и в срок
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8">
                      Записаться онлайн
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Онлайн-запись</DialogTitle>
                      <DialogDescription>
                        Выберите дату, время и услугу для записи на обслуживание
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name2">Имя</Label>
                          <Input
                            id="name2"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone2">Телефон</Label>
                          <Input
                            id="phone2"
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="service2">Услуга</Label>
                        <Select value={service} onValueChange={setService}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите услугу" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.title} value={s.title}>
                                {s.title} — {s.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Дата</Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                          disabled={(date) => date < new Date()}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Время</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? 'default' : 'outline'}
                              onClick={() => setSelectedTime(time)}
                              className="w-full"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment2">Комментарий (необязательно)</Label>
                        <Textarea
                          id="comment2"
                          placeholder="Опишите проблему или оставьте дополнительные пожелания"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Отправить заявку
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Icon name="Phone" size={20} className="mr-2" />
                  +7 (495) 123-45-67
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.poehali.dev/projects/76f21f8a-c1a1-4206-ae53-ee9b482ba42e/files/fa8476b3-b0e2-489b-97f3-ab70789a7cdd.jpg"
                  alt="Автосервис МКПП"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-none bg-transparent animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр работ по обслуживанию и ремонту механических коробок передач
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setService(service.title)}>
                          Записаться
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Онлайн-запись</DialogTitle>
                          <DialogDescription>
                            Выберите дату, время и услугу для записи на обслуживание
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`name-${index}`}>Имя</Label>
                              <Input
                                id={`name-${index}`}
                                placeholder="Ваше имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`phone-${index}`}>Телефон</Label>
                              <Input
                                id={`phone-${index}`}
                                type="tel"
                                placeholder="+7 (___) ___-__-__"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`service-${index}`}>Услуга</Label>
                            <Select value={service} onValueChange={setService}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите услугу" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((s) => (
                                  <SelectItem key={s.title} value={s.title}>
                                    {s.title} — {s.price}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Дата</Label>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="rounded-md border"
                              disabled={(date) => date < new Date()}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Время</Label>
                            <div className="grid grid-cols-5 gap-2">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  type="button"
                                  variant={selectedTime === time ? 'default' : 'outline'}
                                  onClick={() => setSelectedTime(time)}
                                  className="w-full"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`comment-${index}`}>Комментарий (необязательно)</Label>
                            <Textarea
                              id={`comment-${index}`}
                              placeholder="Опишите проблему или оставьте дополнительные пожелания"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <Button type="submit" size="lg" className="w-full">
                            Отправить заявку
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold">Свяжитесь с нами</h2>
            <p className="text-xl text-muted-foreground">
              Работаем ежедневно с 9:00 до 20:00
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (495) 123-45-67
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Mail" size={20} className="mr-2" />
                info@mkpp-service.ru
              </Button>
            </div>
            <p className="text-muted-foreground">
              г. Москва, ул. Автомобильная, д. 10
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Settings" size={24} className="text-primary" />
              <span className="font-bold">МКПП Сервис</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 МКПП Сервис. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
