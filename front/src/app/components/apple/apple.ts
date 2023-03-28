export class Apple {
  private units: any[];
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastTime: number;
  private settings = {
    unitMaximum: 20,
    radius: 15,
    gravity: 0.1,
    corFactor: 0.5,
    mass: 1,
    creationFactor: 0.02,
  };

  constructor(canvas: HTMLCanvasElement) {
    this.units = [];
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.lastTime = new Date().getTime();
    this.init();
  }

  private init(): void {
    window.onresize = () => {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.canvas.width = width;
      this.canvas.height = height;
    };
    window.onresize(new UIEvent('resize'));
  }

  public addUnit(settings: any): boolean {
    const self = this;

    if (self.units.length >= self.settings.unitMaximum) {
      return false;
    }

    settings.radius = self.settings.radius;
    settings.mass =
      (Math.random() * self.settings.mass) / 2 + (self.settings.mass / 4) * 3;
    settings.bounceCount = 0;

    settings.velocity = {
      x: Math.random() * 4 - 2,
      y: 0,
    };

    this.units.push(settings);
    return true;
  }

  private getVelocity(unit1: any, unit2: any): any {
    const self = this;
    return {
      x:
        ((unit1.mass - unit2.mass * self.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit1.velocity.x +
        ((unit2.mass + unit2.mass * self.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit2.velocity.x,
      y:
        ((unit1.mass - unit2.mass * self.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit1.velocity.y +
        ((unit2.mass + unit2.mass * self.settings.corFactor) /
          (unit1.mass + unit2.mass)) *
          unit2.velocity.y,
    };
  }

  public update(): void {
    const self = this;

    self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

    if (self.units.length < self.settings.unitMaximum) {
      if (Math.random() <= self.settings.creationFactor) {
        self.addUnit({
          x: self.canvas.width * Math.random(),
          y: self.canvas.height,
        });
      }
    }

    for (let idx in self.units) {
      self.units[idx].cals = false;
    }

    for (let idx in self.units) {
      let collapsed = false;

      const unit = self.units[idx];
      const afterUnitPosition = {
        x: unit.x + unit.velocity.x,
        y: unit.y - unit.velocity.y,
      };

      if (unit.cals === false) {
        // Skip of pre-calculated units.

        for (let key in self.units) {
          if (key === idx) {
            continue;
          }

          const item = self.units[key];
          const afterItemPosition = {
            x: item.x + item.velocity.x,
            y: item.y - item.velocity.y,
          };

          const distanceUnits = Math.sqrt(
            Math.pow(afterItemPosition.x - afterUnitPosition.x, 2) +
              Math.pow(afterItemPosition.y - afterUnitPosition.y, 2)
          );
          const sumRadius = item.radius + unit.radius;

          if (distanceUnits < sumRadius) {
            collapsed = true;

            const afterVelocity1 = self.getVelocity(unit, item);
            const afterVelocity2 = self.getVelocity(item, unit);

            unit.velocity.x = afterVelocity1.x;
            unit.velocity.y = afterVelocity1.y;
            item.velocity.x = afterVelocity2.x;
            item.velocity.y = afterVelocity2.y;

            unit.cals = true;
            item.cals = true;

            break;
          }
        }
      }

      if (
        unit.x + unit.velocity.x <= 0 ||
        unit.x + unit.velocity.x + unit.radius >= self.canvas.width
      ) {
        collapsed = true;
        unit.velocity.x *= -1;
      }

      if (unit.y - unit.velocity.y < 0) {
        if (unit.bounceCount > 5) {
          self.units.splice(Number(idx), 1);
          continue;
        } else {
          collapsed = true;
          unit.velocity.y *= -self.settings.corFactor;
          unit.bounceCount += 1;
        }
      } else {
        unit.velocity.y += self.settings.gravity;
      }

      unit.x += unit.velocity.x;
      unit.y -= unit.velocity.y;

      self.context.beginPath();
      self.context.arc(
        unit.x,
        self.canvas.height - unit.y,
        unit.radius * unit.mass,
        0,
        2 * Math.PI,
        false
      );

      if (collapsed === true) {
        self.context.fillStyle = 'red';
      } else {
        self.context.fillStyle = 'black';
      }

      self.context.fill();
      self.context.closePath();
    }

    self.context.fillStyle = '#000000';
    self.context.fillText(
      parseInt(String(1000 / (new Date().getTime() - Number(this.lastTime)))) +
        ' fps',
      this.canvas.width - 50,
      20
    );
    this.lastTime = new Date().getTime();

    window.requestAnimationFrame(() => {
      self.update.call(self);
    });
  }
}
